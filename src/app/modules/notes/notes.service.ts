import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Note } from './notes.types';
import { HttpClient } from '@angular/common/http';
import { cloneDeep } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private _note: BehaviorSubject<Note | null> =
    new BehaviorSubject<Note | null>(null);
  private _notes: BehaviorSubject<Note[] | null> = new BehaviorSubject<
    Note[] | null
  >(null);

  constructor(private _httpClient: HttpClient) {}

  get notes$(): Observable<Note[]> {
    return this._notes
      .asObservable()
      .pipe(filter((notes: Note[] | null): notes is Note[] => notes !== null));
  }

  get note$(): Observable<Note> {
    return this._note
      .asObservable()
      .pipe(filter((note: Note | null): note is Note => note !== null));
  }

  getNotes(): Observable<Note[]> {
    return this._httpClient.get<Note[]>('api/apps/notes/all').pipe(
      tap((response: Note[]) => {
        this._notes.next(response);
      })
    );
  }
  deleteNote(id: string): Observable<boolean> {
    return this._httpClient
      .delete<boolean>('api/apps/notes', { params: { id } })
      .pipe(
        map((isDeleted: boolean) => {
          // Update the notes
          this.getNotes().subscribe();

          // Return the deleted status
          return isDeleted;
        })
      );
  }
  createNote(note: Note): Observable<Note> {
    console.log(note);

    return this._httpClient
      .post<Note>('api/apps/notes', { note })
      .pipe(
        switchMap((response) =>
          this.getNotes().pipe(
            switchMap(() =>
              this.getNoteById(response.id).pipe(map(() => response))
            )
          )
        )
      );
  }

  getNoteById(id: string): Observable<Note> {
    return this._notes.pipe(
      take(1),
      map((notes) => {
        // Find within the folders and files
        const note = notes?.find((value) => value.id === id) || null;

        // Update the note
        this._note.next(note);

        // Return the note
        return note;
      }),
      switchMap((note) => {
        if (!note) {
          return throwError(
            () => 'Could not found the note with id of ' + id + '!'
          );
        }

        return of(note);
      })
    );
  }
  updateNote(note: Note): Observable<Note> {
    const updatedNote = cloneDeep(note) as any;

    return this._httpClient.patch<Note>('api/apps/notes', { updatedNote }).pipe(
      tap((response) => {
        // Update the notes
        this.getNotes().subscribe();
      })
    );
  }
}
