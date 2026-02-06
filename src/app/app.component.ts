import { Component } from '@angular/core';
import { ProductListComponent } from './product-list/product-list';
import { ProductFormComponent } from './product-form/product-form';
import { CartComponent } from './cart/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductListComponent,
    ProductFormComponent,
    CartComponent
  ],
  templateUrl: './app.html',
})
export class AppComponent {
  title = 'Product Cart - Week 6';
}