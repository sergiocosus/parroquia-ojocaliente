import { ShareButtonsConfig } from '@ngx-share/core';

export const shareButtonsConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter', 'linkedin', 'google', 'pinterest',
    'reddit', 'tumblr', 'mix', 'vk', 'telegram', 'messenger', 'whatsapp',
    'xing', 'line', 'sms', 'email', 'print', 'copy'],
  exclude: [],
  theme: 'outline',
  gaTracking: true,
  autoSetMeta: true,
};
