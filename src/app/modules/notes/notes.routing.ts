import { Route } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NotesListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

export const notesRoutes: Route[] = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: '',
        component: NotesListComponent,
      },
      {
        path: 'create',
        component: DetailsComponent,
      },
      {
        path: ':id',
        component: DetailsComponent,
      },
    ],
  },
];
