import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { NoteService } from '../services/notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class NoteDetailPage implements OnInit {

  noteId: string = '';
  note: any = null;

  studentId: string = '';
  studentName: string = '';
  score: number | null = null;
  course: string = '';
  semester: number | null = null;
  coefficient: number | null = 1;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private noteService = inject(NoteService);

  ngOnInit() {
    this.noteId = this.route.snapshot.paramMap.get('id') || '';
    if (this.noteId) {
      this.loadNote();
    }
  }

  loadNote() {
    this.noteService.getNoteById(this.noteId).subscribe({
      next: (res) => {
        this.note = res;
        this.studentId = res.studentId;
        this.studentName = res.studentName;
        this.score = res.score;
        this.course = res.course;
        this.semester = res.semester;
        this.coefficient = res.coefficient;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors du chargement de la note');
      }
    });
  }

  updateNote() {
    if (!this.studentId || !this.studentName || this.score === null || !this.course || this.semester === null) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const updatedNote = {
      studentId: this.studentId,
      studentName: this.studentName,
      score: this.score,
      course: this.course,
      semester: this.semester,
      coefficient: this.coefficient || 1
    };

    this.noteService.updateNote(this.noteId, updatedNote).subscribe({
      next: () => alert('Note mise à jour avec succès !'),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la mise à jour de la note');
      }
    });
  }

  deleteNote() {
    if (confirm('Voulez-vous vraiment supprimer cette note ?')) {
      this.noteService.deleteNote(this.noteId).subscribe({
        next: () => {
          alert('Note supprimée avec succès !');
          this.router.navigate(['/notes']); 
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de la suppression de la note');
        }
      });
    }
  }

}
