import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html'
})
export class Products {
  private service = inject(ProductsService);
  products = signal<any[]>([]);

  ngOnInit() {
    this.service.getProducts().subscribe(data => {
      this.products.set(data);
    });
  }
}
