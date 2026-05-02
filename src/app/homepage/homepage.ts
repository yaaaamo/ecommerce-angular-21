import { Component, inject, OnInit, signal } from '@angular/core';
import { HomepageService } from '../shared/homepage.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.html'
})
export class Homepage implements OnInit {
  private service = inject(HomepageService);
  rayons = signal<any[]>([]);

  ngOnInit() {
    this.service.getHomepage().subscribe(data => {
      this.rayons.set(data);
    });
  }
}
