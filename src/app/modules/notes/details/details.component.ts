import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NotesService } from '../notes.service';
import { Subject, debounceTime, map, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../notes.types';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('editorElement') private editorElementRef!: ElementRef;
  DetailForm: UntypedFormGroup;
  editorContent: string = '';
  id!: string;
  isEdit: boolean = false;

  noteChanged: Subject<Note> = new Subject<Note>();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _notesService: NotesService,
    private _router: Router,
    private _active_route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userService: UserService
  ) {
    this.DetailForm = this._formBuilder.group({
      titulo: ['', [Validators.required]],
      description: ['', Validators.required],
      country: '',
      color: '',
    });
    this._userService.user$.subscribe((user) => {
      this.DetailForm.patchValue({
        country: user.country,
      });
    });
    this._active_route.params.subscribe((params: any) => {
      let id = params['id'];
      if (id) {
        console.log(id);

        this.id = id;
        this.isEdit = true;
        this._notesService.getNoteById(id).subscribe((nota) => {
          this.DetailForm.patchValue({ ...nota });
        });
      }
    });
  }
  ngAfterViewInit(): void {
    const editorElement = this.editorElementRef.nativeElement;

    // Verifica si el elemento existe
    if (editorElement) {
      const { description } = this.DetailForm.value;
      editorElement.innerText = description;
    }
  }

  ngOnInit() {
    this.noteChanged
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(500),
        switchMap((note) => {
          return this._notesService.updateNote(note);
        })
      )
      .subscribe(() => {
        // Mark for check
        console.log('cambios');

        this._changeDetectorRef.markForCheck();
        this._router.navigate(['/app/notes']);
      });
  }

  onEditorInput(event: Event): void {
    const element = event.target as HTMLDivElement;
    this.editorContent = element.innerText;
    this.DetailForm.patchValue({
      description: this.editorContent,
    });
  }

  selectColor(color: string): void {
    this.DetailForm.patchValue({
      color,
    });
  }

  registerNote() {
    if (this.DetailForm.invalid) {
      return;
    }
    if (this.isEdit) {
      this.updateNoteDetails(this.DetailForm.value);
    } else {
      this._notesService.createNote(this.DetailForm.value).subscribe();
      this._router.navigate(['/app/notes']);
    }
  }

  updateNoteDetails(note: Note): void {
    this.noteChanged.next({ ...note, id: this.id });
  }
}
