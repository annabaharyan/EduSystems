import type { NotificationArgsProps } from 'antd';
import { getNotificationApi } from './notificationService';

export function notify({
                         type = 'success',
                         message = 'Success',
                         description = '',
                         duration = 3,
                       }: NotificationArgsProps & { type?: 'success' | 'error' | 'info' | 'warning' }) {
  getNotificationApi()[type]({ message, description, duration });
}