import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { CartService } from './shared/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, Homepage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
  cart = inject(CartService);
}

// Homepage est importé directement comme composant statique — il sera toujours affiché
// RouterOutlet est l'emplacement où s'insèrent les composants routés
// signal('ecommerce') → un signal Angular (réactif)