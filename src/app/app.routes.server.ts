import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products',
    renderMode: RenderMode.Server   // ← rendu dynamique avec données
  },
  {
    path: 'search',
    renderMode: RenderMode.Server
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client   // ← pas besoin de SSR pour le panier
  },
  {
    path: 'users',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];