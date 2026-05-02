import { Routes } from '@angular/router';
import { Products } from './products/products';
import { Cart } from './cart/cart';
import { Search } from './search/search';
import { User } from './user/user';

export const routes: Routes = [
  { path: 'products', component: Products },
  { path: 'search',   component: Search },
  { path: 'cart', component: Cart },
  { path: 'users', component: User}
];

//on associe une URL à un composant. 
// Quand l'utilisateur clique sur un routerLink="/products", 
// Angular insère <app-products> dans le <router-outlet>.