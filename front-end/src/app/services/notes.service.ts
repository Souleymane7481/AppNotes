import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
private apiUrl = 'https://notesapp-backend-1ic9.onrender.com/api/notes';
  

  constructor(private http: HttpClient) { }

  // Notes CRUD
  getNotes(studentId?: string): Observable<any[]> {
    const url = studentId ? `${this.apiUrl}?studentId=${studentId}` : this.apiUrl;
    return this.http.get<any[]>(url);
  }

  getNoteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createNote(note: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, note);
  }

  updateNote(id: string, note: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // 🔥 Moyennes
  // Récupérer toutes les moyennes stockées
  getStudentsWithAverage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/students-with-average`);
  }

  // Récupérer les moyennes stockées pour un étudiant spécifique
  getStoredAverages(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/average/stored/${studentId}`);
  }

  // Calculer et stocker les moyennes (backend)
  calculateAndStoreAverages(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/calculate-average?studentId=${studentId}`);
  }
}
