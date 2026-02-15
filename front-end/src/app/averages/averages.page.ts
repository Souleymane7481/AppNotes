import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList
} from '@ionic/angular/standalone';
import { NoteService } from '../services/notes.service';

@Component({
  selector: 'app-averages',
  standalone: true,
  templateUrl: './averages.page.html',
  styleUrls: ['./averages.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList
  ]
})
export class AveragesPage implements OnInit {

  students: any[] = [];
  loading: boolean = false;
  error: string = '';

  studentIdToCalculate: string = ''; // 🔹 Champ pour saisir ID

  private noteService = inject(NoteService);

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.error = '';

    this.noteService.getStudentsWithAverage().subscribe({
      next: data => {
        this.students = data.map(s => ({
          studentId: s.studentId,
          studentName: s.studentName,
          generalAverage: s.generalAverage ?? null,
          averagesBySemester: s.averagesBySemester ?? []
        }));
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Erreur lors de la récupération des étudiants';
        this.loading = false;
      }
    });
  }

  // 🔹 Nouvelle méthode : calculer la moyenne pour un étudiant
  calculateAverage() {
    if (!this.studentIdToCalculate) {
      this.error = 'Veuillez entrer l’ID de l’étudiant';
      return;
    }

    this.loading = true;
    this.error = '';

    this.noteService.calculateAndStoreAverages(this.studentIdToCalculate).subscribe({
      next: data => {
        // Mettre à jour ou ajouter l'étudiant calculé dans la liste
        const index = this.students.findIndex(s => s.studentId === data.studentId);
        if (index !== -1) {
          this.students[index] = {
            studentId: data.studentId,
            studentName: data.studentName,
            generalAverage: data.generalAverage,
            averagesBySemester: data.averagesBySemester
          };
        } else {
          this.students.push({
            studentId: data.studentId,
            studentName: data.studentName,
            generalAverage: data.generalAverage,
            averagesBySemester: data.averagesBySemester
          });
        }
        this.loading = false;
        this.studentIdToCalculate = ''; // Réinitialiser champ
      },
      error: err => {
        console.error(err);
        this.error = 'Erreur lors du calcul des moyennes';
        this.loading = false;
      }
    });
  }

}
