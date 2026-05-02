import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  getHomepage(): Observable<any[]> {
    const base = isPlatformServer(this.platformId)
      ? 'http://localhost:4000'
      : '';
    return this.http.get<any[]>('/api/homepage');
  }
}

// Service singleton (providedIn: 'root') qui fait un GET sur /api/homepage