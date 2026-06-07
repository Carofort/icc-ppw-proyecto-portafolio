import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactRequestService } from '../../core/services/contact-request.service';

@Component({
  selector: 'app-contact-requests',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-requests.html',
})
export class ContactRequests {
  nombre = '';
  correo = '';
  programador = '';
  descripcion = '';

  private contactRequestService = inject(ContactRequestService);
  async enviarSolicitud(): Promise<void> {
    const request = {
      nombreSolicitante: this.nombre,
      correoSolicitante: this.correo,
      programador: this.programador,
      descripcionProyecto: this.descripcion,

      fechaCreacion: new Date(),

      estado: 'Pendiente',

      respuesta: '',
    };

    try {
      await this.contactRequestService.createRequest(request);

      alert('Solicitud enviada correctamente');

      this.nombre = '';
      this.correo = '';
      this.programador = '';
      this.descripcion = '';
    } catch (error) {
      console.error(error);

      alert('Error al enviar solicitud');
    }
  }
}
