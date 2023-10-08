import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { RouterModule } from '@angular/router';
import { authSignUpRoutes } from './sign-up.routing';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [RouterModule.forChild(authSignUpRoutes), SharedModule],
})
export class SignUpModule {}
