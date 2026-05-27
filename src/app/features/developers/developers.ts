import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './developers.html',
})
export class Developers {
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
