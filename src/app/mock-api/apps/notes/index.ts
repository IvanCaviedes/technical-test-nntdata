import { Injectable } from '@angular/core';
import { MockApiService, NttDataMockApiUtils } from '@ntt-data/lib/mock-api';
import { cloneDeep } from 'lodash-es';
import { notes as notesData } from './data';

@Injectable({
  providedIn: 'root',
})
export class NotesMockApi {
  private _notes: any[] = notesData;

  constructor(private _MockApiService: MockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  registerHandlers(): void {
    this._MockApiService.onGet('api/apps/notes/all').reply(() => {
      let notes = cloneDeep(this._notes);
      return [200, notes];
    });

    this._MockApiService.onDelete('api/apps/notes').reply(({ request }) => {
      // Get the id
      const id = request.params.get('id');

      // Find the note and delete it
      this._notes.forEach((item, index) => {
        if (item.id === id) {
          this._notes.splice(index, 1);
        }
      });

      // Return the response
      return [200, true];
    });

    this._MockApiService.onPost('api/apps/notes').reply(({ request }) => {
      // Get note
      const note = request.body.note;
      // Add an id
      note.id = NttDataMockApiUtils.guid();

      // Push the note
      this._notes.push(note);
      return [200, note];
    });

    this._MockApiService.onPatch('api/apps/notes').reply(({ request }) => {
      // Get note
      const updatedNote = request.body.updatedNote;

      // Update the note
      this._notes = this._notes.map((note) => {
        if (note.id === updatedNote.id) {
          return {
            ...updatedNote,
          };
        }

        return note;
      });

      return [200, updatedNote];
    });
  }
}
