import { prisma } from '@/lib/prisma';
import { NotificationType, Role } from '@prisma/client';

export class NotificationService {
  static async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string
  ) {
    return prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
      },
    });
  }

  static async notifyAdmins(type: NotificationType, title: string, message: string) {
    try {
      const admins = await prisma.user.findMany({
        where: { role: Role.ADMIN, active: true },
        select: { id: true },
      });

      if (admins.length === 0) return;

      await prisma.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          type,
          title,
          message,
        })),
      });
    } catch (err) {
      console.error('Error notifying admins:', err);
    }
  }

  static async getUserNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  static async markAsRead(userId: string, notificationId: string) {
    return prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { readAt: new Date() },
    });
  }

  static async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }
}

