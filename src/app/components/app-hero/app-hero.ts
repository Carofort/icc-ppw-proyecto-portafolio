import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-hero.html',
  styleUrl: './app-hero.css',
})
export class AppHero implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
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
