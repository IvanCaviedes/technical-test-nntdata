import { Route } from '@angular/router';
import { NoAuthGuard } from './core/auth/guards/no-auth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';

export const notesRoutes: Route[] = [
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
