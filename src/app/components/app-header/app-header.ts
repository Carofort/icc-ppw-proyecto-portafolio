import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader {
  authService = inject(AuthService);
  private router = inject(Router);
  currentUser = this.authService.currentUser;

  goToRequest() {
  const user = this.authService.currentUser();

  console.log('Email:', this.authService.currentUser()?.email);
console.log('Rol:', this.authService.role());

  if (!user) {
    this.router.navigate(['/auth']);
    return;
  }

  if (this.authService.role() === 'admin') {
    this.router.navigate(['/admin-requests']);
  } else {
    this.router.navigate(['/contact-requests']);
  }
}

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
