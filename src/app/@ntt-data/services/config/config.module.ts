import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NTT_DATA_APP_CONFIG } from './config.constants';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class NttDataConfigModule {
  constructor() {}

  static forRoot(config: any): ModuleWithProviders<NttDataConfigModule> {
    return {
      ngModule: NttDataConfigModule,
      providers: [
        {
          provide: NTT_DATA_APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
