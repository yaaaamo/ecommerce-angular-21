import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../shared/search.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html'
})
export class Search {
  private service = inject(SearchService);
  cart = inject(CartService);

  // Critères de recherche (liés au formulaire via [(ngModel)])
  rayon = '';
  marque = '';
  prixMax = 2000;

  // Résultats
  resultats = signal<any[]>([]);
  recherchee = signal(false);

  onSubmit() {
    this.service.search(this.rayon, this.marque, this.prixMax)
      .subscribe(data => {
        this.resultats.set(data);
        this.recherchee.set(true);
      });
  }
}

// imports: [FormsModule] → obligatoire pour utiliser [(ngModel)] (sinon Angular ne reconnaîtra pas la directive)
// rayon, marque, prixMax sont des propriétés simples (pas des signaux) parce que [(ngModel)] ne marche pas avec les signaux directement
// resultats est un signal pour l'affichage réactif des résultats