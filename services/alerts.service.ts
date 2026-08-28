import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { priceAlertSchema } from '@/validators';
import { NotificationService } from './notifications.service';

export class AlertService {
  static async getUserAlerts(userId: string) {
    return prisma.priceAlert.findMany({
      where: { userId },
      include: {
        product: true,
        mandi: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createAlert(userId: string, data: z.infer<typeof priceAlertSchema>) {
    return prisma.priceAlert.create({
      data: {
        userId,
        productId: data.productId,
        mandiId: data.mandiId || null,
        condition: data.condition,
        targetPrice: data.targetPrice,
        active: true,
        triggered: false,
      },
      include: {
        product: true,
        mandi: true,
      },
    });
  }

  static async deleteAlert(userId: string, alertId: string) {
    return prisma.priceAlert.deleteMany({
      where: { id: alertId, userId },
    });
  }

  static async toggleAlertActive(userId: string, alertId: string, active: boolean) {
    return prisma.priceAlert.updateMany({
      where: { id: alertId, userId },
      data: { active },
    });
  }

  static async checkAndTriggerAlerts(productId: string, mandiId: string, currentRate: number) {
    const alerts = await prisma.priceAlert.findMany({
      where: {
        productId,
        active: true,
        triggered: false,
        OR: [
          { mandiId: null },
          { mandiId },
        ],
      },
      include: {
        product: true,
        mandi: true,
        user: true,
      },
    });

    for (const alert of alerts) {
      let conditionMet = false;
      const target = Number(alert.targetPrice);

      if (alert.condition === 'ABOVE' && currentRate >= target) {
        conditionMet = true;
      } else if (alert.condition === 'BELOW' && currentRate <= target) {
        conditionMet = true;
      }

      if (conditionMet) {
        await prisma.$transaction([
          prisma.priceAlert.update({
            where: { id: alert.id },
            data: { triggered: true },
          }),
          prisma.notification.create({
            data: {
              userId: alert.userId,
              type: 'ALERT',
              title: `Price Alert: ${alert.product.name}`,
              message: `Price for ${alert.product.name} ${alert.mandi ? `at ${alert.mandi.name}` : ''} is now ₹${currentRate.toFixed(2)} (${alert.condition.toLowerCase()} your target of ₹${target.toFixed(2)}).`,
            },
          }),
        ]);
      }
    }
  }
}
