import { Layout } from 'app/layout/layout.types';

export interface AppConfig {
  layout: Layout;
}

export const appConfig: AppConfig = {
  layout: 'empty',
};
