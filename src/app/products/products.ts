import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html'
})
export class Products implements OnInit {
  private service = inject(ProductsService);
  products = signal<any[]>([]);

  async ngOnInit() {
    const data = await firstValueFrom(this.service.getProducts());
    this.products.set(data);
  }
}