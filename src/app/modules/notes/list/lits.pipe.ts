import { Pipe, PipeTransform } from '@angular/core';
import { Note, NotewithCountry } from '../notes.types';

@Pipe({
  name: 'filterByCountry',
})
export class FilterByCountryPipe implements PipeTransform {
  transform(tareas: Note[], paisFiltrado: string): Note[] {
    if (!paisFiltrado || paisFiltrado.trim() === '') {
      return tareas;
    }

    return tareas.filter((tarea) =>
      tarea.country.toLowerCase().includes(paisFiltrado.toLowerCase())
    );
  }
}
