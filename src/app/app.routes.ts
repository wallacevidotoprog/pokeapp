import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/details/pokemonDetailsPage.component').then(
        (m) => m.DetailsPage
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/pokemonFavorites.component').then(
        (m) => m.FavoritesPage
      ),
  },
  {
    path: '**',
    redirectTo: 'home', 
  },
];
