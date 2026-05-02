import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html'
})
export class Cart {
  items = signal<any[]>([]);

  ngOnInit() {}
}
