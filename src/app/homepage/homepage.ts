import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HomepageService } from '../shared/homepage.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.html'
})
export class Homepage implements OnInit {
  private service = inject(HomepageService);
  rayons = signal<any[]>([]);

  async ngOnInit() {
    const data = await firstValueFrom(this.service.getHomepage());
    this.rayons.set(data);
  }
}

// inject(HomepageService) → injection de dépendance 
// rayons = signal<any[]>([]) → état réactif initialisé à un tableau vide
// Dans ngOnInit, on s'abonne à l'observable retourné par le service et on met à jour le signal avec .set()