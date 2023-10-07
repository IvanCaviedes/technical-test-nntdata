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
import { notesRoutes } from './app.routing';
import { CoreModule } from './core/core.module';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(notesRoutes, routerConfig),
    CoreModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
