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
    if (this.authService.currentUser()) {
      this.router.navigate(['/contact-requests']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  logout() {
  this.authService.logout().subscribe(() => {
    this.router.navigate(['/home']);
  });
}
}
