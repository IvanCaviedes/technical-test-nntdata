import { Route } from '@angular/router';
import { SignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './sign-up.component';

export const authSignUpRoutes: Route[] = [
  {
    path: '',
    component: SignUpComponent,
  },
];
