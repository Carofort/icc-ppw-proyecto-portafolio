import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Developer } from '../../core/interfaces/developer';
import { DeveloperService } from '../../core/services/developer.service';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './developers.html',
})
export class Developers implements OnInit {
  private developerService = inject(DeveloperService);

  developer?: Developer;
  developerDescription = '';
  profileImage = '';

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.loadDeveloper();
  }

  loadDeveloper(): void {
    this.developerService.getDevelopers().subscribe({
      next: (response) => {
        this.developer = response.data[0];
        this.developerDescription =
          response.data[0].descripcionCompleta?.[0]?.children?.[0]?.text ?? '';
        this.profileImage = response.data[0].foto.url;
        this.cdr.detectChanges();
      },
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
