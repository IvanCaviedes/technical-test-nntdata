import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmptyComponent } from './empty.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [EmptyComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [EmptyComponent],
})
export class EmptyLayoutModule {}
