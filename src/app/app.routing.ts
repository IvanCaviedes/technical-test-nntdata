import { Route } from '@angular/router';

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
