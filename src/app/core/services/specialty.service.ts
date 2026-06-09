import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {

  private http = inject(HttpClient);

  private apiUrl = 'https://delicate-presence-af112459c7.strapiapp.com/api/especialidads';

  getSpecialties() {
    return this.http.get<any>(this.apiUrl);
  }
}