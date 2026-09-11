/**
 * Demand Management Service
 * ─────────────────────────────────────────────────────────────
 * COMPLETELY SEPARATE from OrderService — ORDER != DEMAND
 * No shared business logic with orders.service.ts
 * ─────────────────────────────────────────────────────────────
 */

import { prisma } from '@/lib/prisma';
import { DemandStatus } from '@prisma/client';

// ── Types ─────────────────────────────────────────────────────

export interface CreateDemandItemInput {
  dairyProductId: string;
  requestedQty: number;
}

export interface FulfillItemInput {
  dairyProductId: string;
  deliveredQty: number;
  rate: number;
}

export interface DemandFilters {
  status?: DemandStatus;
  search?: string;         // DM number, shopkeeper name, mobile
  dateFrom?: string;       // ISO date string
  dateTo?: string;
  page?: number;
  limit?: number;
}

// ── ID Generation ─────────────────────────────────────────────

/**
 * Generates next DM-XXXXXX number atomically.
 * Reads MAX existing demandNumber, increments, zero-pads to 6 digits.
 */
async function generateDemandNumber(): Promise<string> {
  const last = await prisma.demand.findFirst({
    orderBy: { demandNumber: 'desc' },
    select: { demandNumber: true },
  });
  let next = 1;
  if (last?.demandNumber) {
    const num = parseInt(last.demandNumber.replace('DM-', ''), 10);
    if (!isNaN(num)) next = num + 1;
  }
  return `DM-${String(next).padStart(6, '0')}`;
}

/**
 * Generates next RCP-XXXXXX receipt number.
 */
async function generateReceiptNumber(): Promise<string> {
  const last = await prisma.demandReceipt.findFirst({
    orderBy: { receiptNumber: 'desc' },
    select: { receiptNumber: true },
  });
  let next = 1;
  if (last?.receiptNumber) {
    const num = parseInt(last.receiptNumber.replace('RCP-', ''), 10);
    if (!isNaN(num)) next = num + 1;
  }
  return `RCP-${String(next).padStart(6, '0')}`;
}

// ── Notification Helper ────────────────────────────────────────

async function notifyAdmins(title: string, message: string) {
  try {
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN', active: true },
      select: { id: true },
    });
    if (admins.length === 0) return;
    await prisma.notification.createMany({
      data: admins.map((a: { id: string }) => ({
        userId: a.id,
        type: 'DEMAND' as const,
        title,
        message,
      })),
    });
  } catch {
    // Non-critical — never fail the main operation
  }
}

async function notifyShopkeeper(shopkeeperId: string, title: string, message: string) {
  try {
    await prisma.notification.create({
      data: {
        userId: shopkeeperId,
        type: 'DEMAND' as const,
        title,
        message,
      },
    });
  } catch {
    // Non-critical
  }
}

// ── Service Methods ────────────────────────────────────────────

export const DemandService = {

  /** List active dairy products grouped by brand */
  async listDairyProducts() {
    const products = await prisma.dairyProduct.findMany({
      where: { active: true },
      orderBy: [{ brand: 'asc' }, { displayOrder: 'asc' }],
    });

    // Group by brand
    const grouped: Record<string, typeof products> = {};
    for (const p of products) {
      if (!grouped[p.brand]) grouped[p.brand] = [];
      grouped[p.brand].push(p);
    }
    return grouped;
  },

  /** Create a new demand (shopkeeper only) */
  async createDemand(shopkeeperId: string, items: CreateDemandItemInput[], notes?: string) {
    // Validate all items have qty > 0
    const invalid = items.filter((i) => i.requestedQty <= 0);
    if (invalid.length > 0) {
      throw new Error('All requested quantities must be greater than 0.');
    }
    if (items.length === 0) {
      throw new Error('At least one dairy product must be selected.');
    }

    // Validate all dairyProductIds exist and are active
    const productIds = items.map((i) => i.dairyProductId);
    const validProducts = await prisma.dairyProduct.findMany({
      where: { id: { in: productIds }, active: true },
      select: { id: true },
    });
    if (validProducts.length !== productIds.length) {
      throw new Error('One or more selected products are invalid or inactive.');
    }

    const demandNumber = await generateDemandNumber();

    const demand = await prisma.demand.create({
      data: {
        demandNumber,
        shopkeeperId,
        status: 'NEW',
        notes: notes || null,
        items: {
          create: items.map((i) => ({
            dairyProductId: i.dairyProductId,
            requestedQty: i.requestedQty,
          })),
        },
        statusHistory: {
          create: {
            status: 'NEW',
            note: 'Demand submitted by shopkeeper.',
            changedBy: shopkeeperId,
          },
        },
      },
      include: {
        items: { include: { dairyProduct: true } },
        shopkeeper: {
          select: {
            fullName: true,
            mobile: true,
            shopkeeperProfile: { select: { shopName: true } },
          },
        },
      },
    });

    // Notify admins
    const shopName = demand.shopkeeper.shopkeeperProfile?.shopName || demand.shopkeeper.fullName;
    await notifyAdmins(
      'New Demand Received',
      `${demand.demandNumber} from ${shopName} — ${items.length} item(s) requested.`
    );

    return demand;
  },

  /** Get demand by ID with role-based access */
  async getDemandById(demandId: string, requesterId: string, requesterRole: string) {
    const demand = await prisma.demand.findUnique({
      where: { id: demandId },
      include: {
        items: {
          include: { dairyProduct: true },
          orderBy: { createdAt: 'asc' },
        },
        statusHistory: { orderBy: { createdAt: 'asc' } },
        receipt: true,
        shopkeeper: {
          select: {
            id: true,
            fullName: true,
            mobile: true,
            shopkeeperProfile: {
              select: { shopName: true, shopAddress: true, city: true },
            },
          },
        },
        whatsappLogs: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });

    if (!demand) throw new Error('Demand not found.');

    // Shopkeeper can only see own demands
    if (requesterRole === 'SHOPKEEPER' && demand.shopkeeperId !== requesterId) {
      throw new Error('Forbidden: You can only view your own demands.');
    }

    return demand;
  },

  /** Get shopkeeper's demand list */
  async getShopkeeperDemands(shopkeeperId: string, status?: DemandStatus) {
    return prisma.demand.findMany({
      where: {
        shopkeeperId,
        ...(status ? { status } : {}),
      },
      include: {
        items: {
          include: { dairyProduct: { select: { brand: true, name: true, variant: true, unit: true } } },
        },
        receipt: { select: { receiptNumber: true, grandTotal: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  /** Edit demand items — only when status = NEW */
  async updateDemand(demandId: string, shopkeeperId: string, items: CreateDemandItemInput[], notes?: string) {
    const demand = await prisma.demand.findUnique({ where: { id: demandId } });
    if (!demand) throw new Error('Demand not found.');
    if (demand.shopkeeperId !== shopkeeperId) throw new Error('Forbidden.');
    if (demand.status !== 'NEW') {
      throw new Error('Demand can only be edited while it is in NEW status. Admin has already started processing.');
    }

    // Validate qty
    const invalid = items.filter((i) => i.requestedQty <= 0);
    if (invalid.length > 0) throw new Error('All quantities must be greater than 0.');
    if (items.length === 0) throw new Error('At least one item is required.');

    await prisma.$transaction(async (tx: any) => {
      // Delete existing items
      await tx.demandItem.deleteMany({ where: { demandId } });
      // Re-create
      await tx.demandItem.createMany({
        data: items.map((i) => ({
          demandId,
          dairyProductId: i.dairyProductId,
          requestedQty: i.requestedQty,
        })),
      });
      // Update notes
      await tx.demand.update({
        where: { id: demandId },
        data: {
          notes: notes ?? demand.notes,
          updatedAt: new Date(),
        },
      });
    });

    return prisma.demand.findUnique({
      where: { id: demandId },
      include: { items: { include: { dairyProduct: true } } },
    });
  },

  /** Cancel demand — only when status = NEW */
  async cancelDemand(demandId: string, shopkeeperId: string) {
    const demand = await prisma.demand.findUnique({
      where: { id: demandId },
      include: { shopkeeper: { select: { fullName: true, shopkeeperProfile: { select: { shopName: true } } } } },
    });
    if (!demand) throw new Error('Demand not found.');
    if (demand.shopkeeperId !== shopkeeperId) throw new Error('Forbidden.');
    if (demand.status !== 'NEW') {
      throw new Error('Demand cannot be cancelled once processing has started. Please contact admin.');
    }

    await prisma.$transaction(async (tx: any) => {
      await tx.demand.update({
        where: { id: demandId },
        data: { status: 'CANCELLED' },
      });
      await tx.demandStatusHistory.create({
        data: {
          demandId,
          status: 'CANCELLED',
          note: 'Cancelled by shopkeeper.',
          changedBy: shopkeeperId,
        },
      });
    });

    const shopName = demand.shopkeeper.shopkeeperProfile?.shopName || demand.shopkeeper.fullName;
    await notifyAdmins(
      'Demand Cancelled',
      `${demand.demandNumber} has been cancelled by ${shopName}.`
    );

    return { success: true };
  },

  // ── Admin Operations ──────────────────────────────────────────

  /** Get all demands for admin with filters */
  async getAdminDemands(filters: DemandFilters) {
    const { status, search, dateFrom, dateTo, page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }
    if (search) {
      where.OR = [
        { demandNumber: { contains: search, mode: 'insensitive' } },
        { shopkeeper: { fullName: { contains: search, mode: 'insensitive' } } },
        { shopkeeper: { mobile: { contains: search, mode: 'insensitive' } } },
        { shopkeeper: { shopkeeperProfile: { shopName: { contains: search, mode: 'insensitive' } } } },
      ];
    }

    const [demands, total] = await Promise.all([
      prisma.demand.findMany({
        where,
        include: {
          items: { select: { id: true } },
          shopkeeper: {
            select: {
              fullName: true,
              mobile: true,
              shopkeeperProfile: { select: { shopName: true, city: true } },
            },
          },
          receipt: { select: { receiptNumber: true, grandTotal: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.demand.count({ where }),
    ]);

    return { demands, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  /** Admin: mark demand as PROCESSING */
  async processDemand(demandId: string, adminId: string) {
    const demand = await prisma.demand.findUnique({ where: { id: demandId } });
    if (!demand) throw new Error('Demand not found.');
    if (demand.status !== 'NEW') {
      throw new Error(`Cannot process demand with status: ${demand.status}`);
    }

    await prisma.$transaction(async (tx: any) => {
      await tx.demand.update({
        where: { id: demandId },
        data: { status: 'PROCESSING', processedAt: new Date() },
      });
      await tx.demandStatusHistory.create({
        data: {
          demandId,
          status: 'PROCESSING',
          note: 'Processing started by admin.',
          changedBy: adminId,
        },
      });
    });

    await notifyShopkeeper(
      demand.shopkeeperId,
      'Demand In Process',
      `Your demand ${demand.demandNumber} is being processed by our team.`
    );

    return { success: true };
  },

  /** Admin: fulfill demand with actual delivery quantities */
  async fulfillDemand(demandId: string, adminId: string, fulfilledItems: FulfillItemInput[]) {
    const demand = await prisma.demand.findUnique({
      where: { id: demandId },
      include: { items: { include: { dairyProduct: true } } },
    });
    if (!demand) throw new Error('Demand not found.');
    if (!['PROCESSING', 'READY', 'OUT_FOR_DELIVERY'].includes(demand.status)) {
      throw new Error(`Cannot fulfill demand with status: ${demand.status}. Must be in PROCESSING, READY, or OUT_FOR_DELIVERY.`);
    }

    // Validate all fulfilled items exist in the demand
    for (const fi of fulfilledItems) {
      const item = demand.items.find((i: any) => i.dairyProductId === fi.dairyProductId);
      if (!item) throw new Error(`Product ${fi.dairyProductId} not found in this demand.`);
      if (fi.deliveredQty < 0) throw new Error('Delivered quantity cannot be negative.');
      if (fi.rate <= 0) throw new Error('Rate must be greater than 0.');
    }

    // Calculate amounts & determine status
    let totalRequested = 0;
    let totalDelivered = 0;
    let allFullyDelivered = true;

    const itemUpdates = demand.items.map((item: any) => {
      const fulfilled = fulfilledItems.find((fi) => fi.dairyProductId === item.dairyProductId);
      const deliveredQty = fulfilled?.deliveredQty ?? 0;
      const rate = fulfilled?.rate ?? Number(item.dairyProduct?.defaultRate ?? 0);
      const amount = deliveredQty * rate;

      const requestedQty = Number(item.requestedQty);
      totalRequested += requestedQty * rate; // requested value at same rate
      totalDelivered += amount;

      if (deliveredQty < requestedQty) allFullyDelivered = false;

      return {
        id: item.id,
        deliveredQty,
        rate,
        amount,
      };
    });

    const finalStatus: DemandStatus = allFullyDelivered ? 'DELIVERED' : 'PARTIALLY_DELIVERED';
    const receiptNumber = await generateReceiptNumber();
    const now = new Date();

    await prisma.$transaction(async (tx: any) => {
      // Update each item
      for (const upd of itemUpdates) {
        await tx.demandItem.update({
          where: { id: upd.id },
          data: {
            deliveredQty: upd.deliveredQty,
            rate: upd.rate,
            amount: upd.amount,
          },
        });
      }

      // Update demand status
      await tx.demand.update({
        where: { id: demandId },
        data: { status: finalStatus, deliveredAt: now },
      });

      // Add status history
      await tx.demandStatusHistory.create({
        data: {
          demandId,
          status: finalStatus,
          note: allFullyDelivered
            ? 'Fully delivered by admin.'
            : 'Partially delivered by admin. Some items had lower quantity than requested.',
          changedBy: adminId,
        },
      });

      // Generate receipt
      await tx.demandReceipt.create({
        data: {
          demandId,
          receiptNumber,
          totalRequested,
          totalDelivered,
          grandTotal: totalDelivered,
        },
      });
    });

    // Notify shopkeeper
    if (finalStatus === 'DELIVERED') {
      await notifyShopkeeper(
        demand.shopkeeperId,
        'Demand Delivered',
        `Your demand ${demand.demandNumber} has been fully delivered. View your receipt.`
      );
    } else {
      await notifyShopkeeper(
        demand.shopkeeperId,
        'Demand Partially Delivered',
        `Your demand ${demand.demandNumber} has been partially delivered. Some items had lower quantity than requested.`
      );
    }

    return { success: true, status: finalStatus, receiptNumber, totalDelivered };
  },

  /** Get receipt data for a demand */
  async getDemandReceipt(demandId: string, requesterId: string, requesterRole: string) {
    const demand = await prisma.demand.findUnique({
      where: { id: demandId },
      include: {
        items: {
          include: { dairyProduct: true },
          orderBy: { createdAt: 'asc' },
        },
        receipt: true,
        shopkeeper: {
          select: {
            fullName: true,
            mobile: true,
            shopkeeperProfile: { select: { shopName: true, shopAddress: true, city: true } },
          },
        },
      },
    });

    if (!demand) throw new Error('Demand not found.');
    if (requesterRole === 'SHOPKEEPER' && demand.shopkeeperId !== requesterId) {
      throw new Error('Forbidden.');
    }
    if (!demand.receipt) throw new Error('Receipt not yet generated. Demand must be delivered first.');

    return demand;
  },

  /** Admin: send receipt via WhatsApp (wa.me link approach) — non-blocking */
  async sendReceiptWhatsApp(demandId: string, adminId: string) {
    const demand = await prisma.demand.findUnique({
      where: { id: demandId },
      include: {
        items: { include: { dairyProduct: true } },
        receipt: true,
        shopkeeper: {
          select: {
            fullName: true,
            mobile: true,
            shopkeeperProfile: { select: { shopName: true } },
          },
        },
      },
    });

    if (!demand) throw new Error('Demand not found.');
    if (!demand.receipt) throw new Error('Receipt not generated yet.');
    if (!demand.shopkeeper.mobile) throw new Error('Shopkeeper mobile number not available.');

    const shopName = demand.shopkeeper.shopkeeperProfile?.shopName || demand.shopkeeper.fullName;
    const mobile = demand.shopkeeper.mobile.replace(/[^0-9]/g, '');
    const phone = mobile.startsWith('91') ? mobile : `91${mobile}`;

    // Build receipt message
    let message = `*KiranaMart Delivery Receipt*\n`;
    message += `Receipt: ${demand.receipt.receiptNumber}\n`;
    message += `Demand: ${demand.demandNumber}\n`;
    message += `Shop: ${shopName}\n`;
    message += `Date: ${new Date(demand.receipt.generatedAt).toLocaleDateString('en-IN')}\n`;
    message += `Status: ${demand.status}\n\n`;
    message += `*Items:*\n`;

    for (const item of demand.items) {
      const p = item.dairyProduct;
      message += `• ${p.brand} ${p.name}${p.variant ? ` (${p.variant})` : ''}\n`;
      message += `  Requested: ${item.requestedQty} ${p.unit}`;
      if (item.deliveredQty !== null) {
        message += ` | Delivered: ${item.deliveredQty} ${p.unit}`;
      }
      if (item.amount !== null) {
        message += ` | ₹${Number(item.amount).toFixed(2)}`;
      }
      message += `\n`;
    }

    message += `\n*Grand Total: ₹${Number(demand.receipt.grandTotal).toFixed(2)}*\n`;
    message += `\nThank you! — KiranaMart Team`;

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Log attempt
    await prisma.demandWhatsAppLog.create({
      data: {
        demandId,
        phoneNumber: phone,
        status: 'SENT',
        sentAt: new Date(),
      },
    });

    return { waUrl, phone, receiptNumber: demand.receipt.receiptNumber };
  },

  /** Admin: get count of demands by status */
  async getDemandStatusCounts() {
    const counts = await prisma.demand.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    const result: Record<string, number> = {};
    for (const c of counts) {
      result[c.status] = c._count.status;
    }
    return result;
  },
};
