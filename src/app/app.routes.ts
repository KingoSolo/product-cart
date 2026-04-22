import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.LoginComponent),
  },

  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./product-list/product-list').then(m => m.ProductListComponent),
  },
  {
    path: 'products/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./product-form/product-form').then(m => m.ProductFormComponent),
  },
  {
    path: 'products/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./product-detail/product-detail').then(m => m.ProductDetailComponent),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./cart/cart').then(m => m.CartComponent),
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' },
];
