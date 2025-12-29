import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar.component';
import { ProductCard } from './product-card/product-card.component';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet, Navbar, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 products: Product[] = [{ id: 1, name: 'Wireless Headphones', description: 'Noise-cancelling', price: 199.99, imageUrl: 'https://via.placeholder.com/200' },
  // add 5
  ];           
  filteredProducts = this.products;
  cart: Product[] = [];

  onSearch(query: string) {           // Add this method
    if (!query) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  onProductSelected(product: Product) { // Add this
    if (!this.cart.some(item => item.id === product.id)) {
      this.cart.push(product);
    }
  }

  isSelected(product: Product): boolean { // Add this
    return this.cart.some(item => item.id === product.id);
  }
}