import { Route } from '@angular/router';
import { SignInComponent } from 'app/modules/auth/sign-in/sign-in.component';

export const authSignInRoutes: Route[] = [
  {
    path: '',
    component: SignInComponent,
  },
];
