import { Route } from '@angular/router';
import { NoAuthGuard } from './core/auth/guards/no-auth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/notes',
  },
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'notes',
  },
  {
    path: '',
    canMatch: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./modules/auth/sign-in/sign-in.module').then(
            (m) => m.SignInModule
          ),
      },
    ],
  },
  {
    path: 'app',
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'notes',
        loadChildren: () =>
          import('./modules/notes/notes/notes.module').then(
            (m) => m.NotesModule
          ),
      },
    ],
  },
];
