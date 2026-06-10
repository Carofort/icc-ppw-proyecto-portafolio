import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactRequestService } from '../../core/services/contact-request.service';
import { AuthService } from '../../core/services/auth';
import { effect } from '@angular/core';

@Component({
  selector: 'app-contact-requests',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-requests.html',
})

export class ContactRequests  {
  nombre = '';
  correo = '';
  programador = '';
  descripcion = '';

  private contactRequestService = inject(ContactRequestService);
  private authService = inject(AuthService);

  misSolicitudes: any[] = [];

  constructor() {
  effect(() => {
    const user = this.authService.currentUser();

    console.log('Usuario actual:', user);
    console.log('UID actual:', user?.uid);

    if (!user) return;

    this.contactRequestService
      .getRequestsByUser(user.uid)
      .subscribe((data) => {
        console.log('Solicitudes encontradas:', data);
        this.misSolicitudes = data;
      });
  });
}

  async enviarSolicitud(): Promise<void> {
    const request = {
      nombreSolicitante: this.nombre,
      correoSolicitante: this.correo,
      programador: this.programador,
      descripcionProyecto: this.descripcion,

      uidUsuario: this.authService.uid,

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
