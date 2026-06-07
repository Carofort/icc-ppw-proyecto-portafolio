import { ChangeDetectorRef, Component, ElementRef, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { DeveloperService } from '../../core/services/developer.service';
import { Developer } from '../../core/interfaces/developer';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-hero.html',
  styleUrl: './app-hero.css',
})
export class AppHero implements OnInit {

  private developerService = inject(DeveloperService);
  private cdr = inject(ChangeDetectorRef);

  developer?: Developer;
  profileImage = '';

  loadDeveloper(): void {
    this.developerService.getDevelopers().subscribe({
      next: (response) => {
        this.developer = response.data[0];
        this.profileImage = 'http://localhost:1337' + response.data[0].foto.url;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  authService = inject(AuthService);
  private router = inject(Router);

  goToRequest() {
    if (this.authService.currentUser()) {
      this.router.navigate(['/contact-requests']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.loadDeveloper();
    // Añadimos la lógica de microinteracciones interactivas para las tarjetas que venía en el script nativo
    const cards = this.el.nativeElement.querySelectorAll('.glass');
    cards.forEach((card: HTMLElement) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
