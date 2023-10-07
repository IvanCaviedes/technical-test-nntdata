import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ExtraOptions,
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { CoreModule } from './core/core.module';
import { MttDataMockApiModule } from '@ntt-data/lib/mock-api';
import { mockApiServices } from './mock-api';
import { NttdataModule } from './@ntt-data';
import { NttDataConfigModule } from '@ntt-data/services/config';
import { appConfig } from './core/config/app.config';
import { LayoutModule } from './layout/layout.module';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(appRoutes, routerConfig),

    NttdataModule,
    NttDataConfigModule.forRoot(appConfig),
    MttDataMockApiModule.forRoot(mockApiServices),

    CoreModule,

    LayoutModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
