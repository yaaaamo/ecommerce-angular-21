import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  search(rayon: string, marque: string, prixMax: number): Observable<any[]> {
    const r = rayon  || '*';
    const m = marque || '*';
    const p = prixMax || 999999;
    return this.http.get<any[]>(`/api/catalogue/${r}/${m}/${p}`);
  }
}