import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductsService } from '../shared/products.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html'
})
export class Products implements OnInit {
  private service = inject(ProductsService);
  cart = inject(CartService);
  products = signal<any[]>([]);

  async ngOnInit() {
    const data = await firstValueFrom(this.service.getProducts());
    this.products.set(data);
  }
}