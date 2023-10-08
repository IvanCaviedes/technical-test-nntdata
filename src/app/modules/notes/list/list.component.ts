import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { NotesService } from '../notes.service';
import { Note } from '../notes.types';
import { Observable, forkJoin, map, mergeMap, switchMap } from 'rxjs';
import { Country } from '@ntt-data/services/country/country.types';
import { CountryService } from '@ntt-data/services/country/country.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class NotesListComponent implements OnInit {
  listArr = new Array(15).fill(0);
  notes$!: Observable<Note[]>;
  user: User = {
    id: '',
    username: 'test',
    password: '',
    profile: 'https://api.dicebear.com/7.x/lorelei/svg?seed=test',
    country: 'Colombia',
  };
  paisFiltrado: string = '';

  constructor(
    private _router: Router,
    private popoverController: PopoverController,
    private _userService: UserService,
    private _notesService: NotesService,
    private _countryService: CountryService
  ) {
    this._userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this._notesService.getNotes().subscribe();
    this.notes$ = this._notesService.notes$;
  }

  getColorClass(colorName: string): string {
    const colorClasses: { [key: string]: string } = {
      blue: 'bg-blue-300',
      orange: 'bg-orange-300',
      pink: 'bg-pink-300',
      teal: 'bg-teal-300',
      red: 'bg-red-300',
    };

    const normalizedColorName = colorName.toLowerCase();
    return colorClasses[normalizedColorName] || '';
  }

  async signOut() {
    this._router.navigate(['/sign-out']);
    await this.popoverController.dismiss();
  }

  async createNote() {
    this._router.navigate(['/app/notes/create']);
  }

  deleteNote(event: Event, noteId: string) {
    event.stopPropagation();
    this._notesService.deleteNote(noteId).subscribe((isDeleted) => {});
  }
  navigateToNoteDetail(noteId: string): void {
    this._router.navigate(['/app/notes', noteId]);
  }

  onSearchbarChange(event: any) {
    const searchTerm: string = event.detail.value;
    this.paisFiltrado = searchTerm;
  }
}
