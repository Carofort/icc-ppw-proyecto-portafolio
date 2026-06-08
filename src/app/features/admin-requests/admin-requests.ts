import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRequestService } from '../../core/services/contact-request.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-requests.html',
})
export class AdminRequests implements OnInit {
  solicitudes: any[] = [];

  private requestService = inject(ContactRequestService);

  filtro = 'Todas';

  get solicitudesFiltradas() {
    if (this.filtro === 'Todas') {
      return this.solicitudes;
    }

    if (this.filtro === 'Pendientes') {
      return this.solicitudes.filter((s) => s.estado === 'Pendiente');
    }

    if (this.filtro === 'Respondidas') {
      return this.solicitudes.filter((s) => s.estado === 'Respondida');
    }

    return this.solicitudes;
  }

  ngOnInit(): void {
    this.requestService.getRequests().subscribe((data) => {
      this.solicitudes = data;

      console.log(data);
    });
  }

  async guardarCambios(solicitud: any) {
    await this.requestService.updateRequest(solicitud.id, {
      estado: 'Respondida',
      respuesta: solicitud.respuesta,
    });

    solicitud.estado = 'Respondida';
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
