import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  bookOutline,
  schoolOutline,
  addCircleOutline,
  listOutline,
  calculatorOutline,
  chevronForwardOutline,
  documentTextOutline,
  barChartOutline,
  trophyOutline,
  bulbOutline,
  heartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon
  ]
})
export class HomePage implements OnInit {
  
  // Statistiques
  totalNotes: number = 12;
  averageScore: string = '14.5';
  totalSubjects: number = 8;
  
  // Progression
  progressPercentage: number = 68;
  
  // Conseil du jour
  dailyTip: string = 'Révisez régulièrement vos notes pour mieux mémoriser. La répétition espacée est la clé de la réussite !';
  
  // Liste de conseils rotatifs
  private tips: string[] = [
    'Révisez régulièrement vos notes pour mieux mémoriser. La répétition espacée est la clé de la réussite !',
    'Fixez-vous des objectifs clairs et mesurables pour chaque matière.',
    'N\'hésitez pas à demander de l\'aide quand vous en avez besoin.',
    'Prenez des pauses régulières pendant vos révisions pour rester concentré.',
    'Organisez votre temps d\'étude et respectez votre planning.',
    'Créez des fiches de révision synthétiques pour chaque chapitre.',
    'Travaillez en groupe pour échanger et progresser ensemble.'
  ];

  constructor() {
    // Enregistrement des icônes Ionicons
    addIcons({
      'book-outline': bookOutline,
      'school-outline': schoolOutline,
      'add-circle-outline': addCircleOutline,
      'list-outline': listOutline,
      'calculator-outline': calculatorOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'document-text-outline': documentTextOutline,
      'bar-chart-outline': barChartOutline,
      'trophy-outline': trophyOutline,
      'bulb-outline': bulbOutline,
      'heart-outline': heartOutline
    });
  }

  ngOnInit() {
    this.loadStats();
    this.loadRandomTip();
  }

  // Charger les statistiques (à connecter avec ton service)
  loadStats() {
    // TODO: Remplacer par ton service de données
    // Exemple:
    // this.noteService.getNotes().subscribe(notes => {
    //   this.totalNotes = notes.length;
    //   this.averageScore = this.calculateAverage(notes);
    //   this.totalSubjects = this.getUniqueSubjects(notes).length;
    // });
    
    // Pour l'instant, valeurs d'exemple
    this.totalNotes = 12;
    this.averageScore = '14.5';
    this.totalSubjects = 8;
    this.progressPercentage = 68;
  }

  // Charger un conseil aléatoire
  loadRandomTip() {
    const randomIndex = Math.floor(Math.random() * this.tips.length);
    this.dailyTip = this.tips[randomIndex];
  }

}