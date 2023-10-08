import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignOutComponent } from './sign-out.component';
import { RouterModule } from '@angular/router';
import { authSignOutRoutes } from './sign-out.routes';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [SignOutComponent],
  imports: [RouterModule.forChild(authSignOutRoutes), SharedModule],
})
export class SignOutModule {}
