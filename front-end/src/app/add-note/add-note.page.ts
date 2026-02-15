import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

import { NoteService } from '../services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class AddNotePage implements OnInit {

  studentId: string = '';
  studentName: string = '';
  score: number | null = null;
  course: string = '';
  semester: number | null = null;
  coefficient: number | null = 1;

  constructor(private noteService: NoteService) { }

  ngOnInit() { }

  addNote() {
    if (!this.studentId || !this.studentName || this.score === null || !this.course || this.semester === null) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newNote = {
      studentId: this.studentId,
      studentName: this.studentName,
      score: this.score,
      course: this.course,
      semester: this.semester,
      coefficient: this.coefficient || 1
    };

    this.noteService.createNote(newNote).subscribe({
      next: () => {
        alert('Note ajoutée avec succès !');
        this.studentId = '';
        this.studentName = '';
        this.score = null;
        this.course = '';
        this.semester = null;
        this.coefficient = 1;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l\'ajout de la note');
      }
    });
  }
}
