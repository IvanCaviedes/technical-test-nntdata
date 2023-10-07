import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authSignInRoutes } from './sign-in.routing';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in.component';
import { SharedModule } from 'app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SignInComponent],
  imports: [RouterModule.forChild(authSignInRoutes), SharedModule],
})
export class SignInModule {}
