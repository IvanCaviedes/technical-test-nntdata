import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotesComponent } from './notes.component';
import { NotesListComponent } from './list/list.component';
import { IonicRouteStrategy } from '@ionic/angular';
import { notesRoutes } from './notes.routing';
import { DetailsComponent } from './details/details.component';
import { CheckmarkDirective } from './details/details.directive';
import { FilterByCountryPipe } from './list/lits.pipe';

@NgModule({
  declarations: [
    NotesComponent,
    NotesListComponent,
    DetailsComponent,
    CheckmarkDirective,
    FilterByCountryPipe,
  ],
  imports: [RouterModule.forChild(notesRoutes), SharedModule],
})
export class NotesModule {}
