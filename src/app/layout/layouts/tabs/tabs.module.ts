import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [TabsComponent],
  imports: [RouterModule, SharedModule],
  exports: [TabsComponent],
})
export class TabsLayoutModule {}
