import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotesComponent } from './notes.component';
import { NotesListComponent } from './list/list.component';
import { IonicRouteStrategy } from '@ionic/angular';
import { notesRoutes } from './notes.routing';

@NgModule({
  declarations: [NotesComponent],
  imports: [RouterModule.forChild(notesRoutes), SharedModule],
})
export class NotesModule {}
