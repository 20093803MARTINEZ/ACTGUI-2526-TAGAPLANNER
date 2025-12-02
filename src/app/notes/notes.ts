import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent {

  noteText: string = '';
  notes: any[] = [];

  editingIndex: number | null = null;

  fontSize: string = '16px';
  fontColor: string = '#000000';
  isBold: boolean = false;
  isItalic: boolean = false;
  isUnderline: boolean = false;

  addOrUpdateNote() {
    const styledNote = {
      text: this.noteText,
      fontSize: this.fontSize,
      fontColor: this.fontColor,
      bold: this.isBold,
      italic: this.isItalic,
      underline: this.isUnderline
    };

    if (this.editingIndex === null) {
      this.notes.push(styledNote);
    } else {
      this.notes[this.editingIndex] = styledNote;
      this.editingIndex = null;
    }

    this.noteText = '';
    this.saveNotes();
  }

  editNote(index: number) {
    const n = this.notes[index];

    this.noteText = n.text;
    this.fontSize = n.fontSize;
    this.fontColor = n.fontColor;
    this.isBold = n.bold;
    this.isItalic = n.italic;
    this.isUnderline = n.underline;

    this.editingIndex = index;
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.saveNotes();
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  constructor() {
    const saved = localStorage.getItem('notes');
    if (saved) this.notes = JSON.parse(saved);
  }
}
