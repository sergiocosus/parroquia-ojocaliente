import { ShareButtonsConfig } from 'ngx-sharebuttons';

export const shareButtonsConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter',  'messenger', 'whatsapp', 'copy'],
  exclude: [],
  theme: 'outline',
  gaTracking: true,
  autoSetMeta: true,
};
