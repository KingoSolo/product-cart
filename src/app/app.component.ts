import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProductCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 40-hour battery life',
      price: 199.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Headphones'
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with blue switches',
      price: 89.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Keyboard'
    },
    {
      id: 3,
      name: '4K Monitor',
      description: '27-inch 4K monitor with IPS panel and 144Hz refresh rate',
      price: 349.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Monitor'
    },
    {
      id: 4,
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with 16,000 DPI sensor',
      price: 59.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Mouse'
    },
    {
      id: 5,
      name: 'USB-C Hub',
      description: '7-in-1 USB-C hub with HDMI, SD card reader, and PD charging',
      price: 39.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Hub'
    },
    {
      id: 6,
      name: 'Portable SSD',
      description: '1TB external SSD with USB 3.2 Gen 2 speeds',
      price: 119.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=SSD'
    }
  ];

  filteredProducts: Product[] = this.products;
  cart: Product[] = [];

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