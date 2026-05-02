import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  private http = inject(HttpClient);

  getHomepage(): Observable<any[]> {
    return this.http.get<any[]>('/api/homepage');
  }
}