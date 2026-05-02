import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  getProducts(): Observable<any[]> {
    const base = isPlatformServer(this.platformId)
      ? 'http://localhost:4000'
      : '';
    return this.http.get<any[]>(`${base}/api/products`);
  }
}