import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonButton
} from '@ionic/angular/standalone';
import { NoteService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
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
    IonList,
    
  ]
})
export class NotesPage implements OnInit {

  notes: any[] = [];
  loading: boolean = true;

  private router = inject(Router);
  private noteService = inject(NoteService);

  ngOnInit() {
    this.getAllNotes();
  }

  getAllNotes() {
    this.loading = true;
    this.noteService.getNotes().subscribe({
      next: (res) => {
        this.notes = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors du chargement des notes');
        this.loading = false;
      }
    });
  }

  goToDetail(noteId: string) {
    this.router.navigate(['/note-detail', noteId]); 
  }

}
