import { Component, inject } from '@angular/core';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html'
})
export class Cart {
  cart = inject(CartService);
}