import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {

  private http = inject(HttpClient);

  private apiUrl = 'https://delicate-presence-af112459c7.strapiapp.com/api/programadors?populate=*';

  getDevelopers() {
    return this.http.get<any>(this.apiUrl);
  }
}