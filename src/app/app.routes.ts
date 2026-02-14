import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login';

import { ProductListComponent } from './product-list/product-list';
import { ProductDetailComponent } from './product-detail/product-detail';
import { CartComponent } from './cart/cart';
import { ProductFormComponent } from './product-form/product-form';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'products/new', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },

  
  { path: '', redirectTo: 'products', pathMatch: 'full' },


  { path: '**', redirectTo: 'products' }
];
