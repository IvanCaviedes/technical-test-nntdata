import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class NotesListComponent implements OnInit {
  listArr = new Array(15).fill(0);

  constructor() {}

  ngOnInit() {}

  getColorClass(index: number): string {
    const colors = [
      'bg-blue-300',
      'bg-orange-300',
      'bg-pink-300',
      'bg-teal-300',
    ]; // Nombres de las clases CSS para cada color
    const colorIndex = index % colors.length; // Calcula el índice del color usando el operador módulo
    return colors[colorIndex];
  }
}
