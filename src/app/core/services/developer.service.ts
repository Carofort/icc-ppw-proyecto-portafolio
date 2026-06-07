import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:1337/api/programadors?populate=*';

  getDevelopers() {
    return this.http.get<any>(this.apiUrl);
  }
}