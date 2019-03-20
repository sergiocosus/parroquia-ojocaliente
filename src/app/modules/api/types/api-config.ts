import { InjectionToken } from '@angular/core';

export const BLOG_API_CONFIG = new InjectionToken<BlogApiConfig>('BLOG_API_CONFIG');

export interface BlogApiConfig {
  apiUrl?: string;
  apiClientID?: string;
  apiClientSecret?: string;
}
