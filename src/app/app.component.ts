import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.html',
})

export class AppComponent {
  products: Product[] = [];

  filteredProducts: Product[] = [];
  cart: Product[] = [];

  constructor(private productService: ProductService) {}
  ngOnInit() {
      this.productService.getAllProducts().subscribe(products => {
        this.products = products;
        this.filteredProducts = products;
      });
    }

  onSearch(query: string) {
    if (!query.trim()) {
      this.filteredProducts = this.products;
      return;
    }
    const lowerQuery = query.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery)
    );
  }

  onProductSelected(product: Product) {
    if (!this.cart.some(item => item.id === product.id)) {
      this.cart.push(product);
    }
  }

  isSelected(product: Product): boolean {
    return this.cart.some(item => item.id === product.id);
  }
}