import { Component } from '@angular/core';
import { AppHero } from '../../components/app-hero/app-hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppHero],
  templateUrl: './home.html',
})
export class Home {}