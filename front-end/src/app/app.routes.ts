import { Routes } from '@angular/router';

export const routes: Routes = [
  // Page par défaut → redirige vers Home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // Page Home
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },

  // Page Notes (liste de toutes les notes)
  {
    path: 'notes',
    loadComponent: () => import('./notes/notes.page').then(m => m.NotesPage),
  },

  // Page Ajouter une note
  {
    path: 'add-note',
    loadComponent: () => import('./add-note/add-note.page').then(m => m.AddNotePage),
  },

  // Page Moyennes
  {
    path: 'averages',
    loadComponent: () => import('./averages/averages.page').then(m => m.AveragesPage),
  },

  // Page Détail d'une note (avec paramètre ID)
  {
    path: 'note-detail/:id',
    loadComponent: () => import('./note-detail/note-detail.page').then(m => m.NoteDetailPage),
  },

  // Wildcard → page non trouvée (facultatif mais conseillé)
  {
    path: '**',
    redirectTo: 'home',
  },
];
