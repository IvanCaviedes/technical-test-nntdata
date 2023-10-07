import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockDataApiInterceptor } from './mock-api.interceptor';
import { NTT_MOCK_API_DEFAULT_DELAY } from './mock-api.constants';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockDataApiInterceptor,
      multi: true,
    },
  ],
  declarations: [],
  imports: [CommonModule],
})
export class MttDataMockApiModule {
  static forRoot(
    mockApiServices: any[],
    config?: { delay?: number }
  ): ModuleWithProviders<MttDataMockApiModule> {
    return {
      ngModule: MttDataMockApiModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          deps: [...mockApiServices],
          useFactory: () => (): any => null,
          multi: true,
        },
        { provide: NTT_MOCK_API_DEFAULT_DELAY, useValue: config?.delay ?? 0 },
      ],
    };
  }
}
