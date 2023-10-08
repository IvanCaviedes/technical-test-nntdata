import { Route } from '@angular/router';
import { IsNoAuthGuard } from './core/auth/guards/no-auth.guard';
import { IsAuthGuard } from './core/auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { Layout } from './layout/layout.types';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/notes',
  },
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'app/notes',
  },
  {
    path: '',
    canMatch: [IsNoAuthGuard],
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
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./modules/auth/sign-up/sign-up.module').then(
            (m) => m.SignUpModule
          ),
      },
    ],
  },

  {
    path: '',
    canMatch: [IsAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () =>
          import('app/modules/auth/sign-out/sign-out.module').then(
            (m) => m.SignOutModule
          ),
      },
    ],
  },

  {
    path: 'app',
    canMatch: [IsAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'tabs' as Layout,
    },
    children: [
      {
        path: 'notes',
        loadChildren: () =>
          import('./modules/notes/notes.module').then((m) => m.NotesModule),
      },
    ],
  },
];
