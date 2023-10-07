import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmptyComponent } from './empty.component';

@NgModule({
  declarations: [EmptyComponent],
  imports: [CommonModule, RouterModule],
  exports: [EmptyComponent],
})
export class EmptyLayoutModule {}
