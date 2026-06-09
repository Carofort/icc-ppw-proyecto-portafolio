import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:1337/api/proyectos?populate=*';

  getProjects() {
    return this.http.get<any>(this.apiUrl);
  }
}