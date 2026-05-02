import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  private service = inject(UserService);
  users = signal<any[]>([]);

  async ngOnInit() {
    const data = await firstValueFrom(this.service.getUsers());
    this.users.set(data);
  }
}
