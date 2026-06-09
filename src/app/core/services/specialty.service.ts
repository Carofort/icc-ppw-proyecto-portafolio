import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:1337/api/especialidads';

  getSpecialties() {
    return this.http.get<any>(this.apiUrl);
  }
}