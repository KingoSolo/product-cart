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
      imageUrl: 'https://m.media-amazon.com/images/I/61EL2AKKcBL._AC_UY436_FMwebp_QL65_.jpg'
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with blue switches',
      price: 89.99,
      imageUrl: 'https://m.media-amazon.com/images/I/71Bk2A2WmOL._AC_UY436_FMwebp_QL65_.jpg'
    },
    {
      id: 3,
      name: '4K Monitor',
      description: '27-inch 4K monitor with IPS panel and 144Hz refresh rate',
      price: 349.99,
      imageUrl: 'https://m.media-amazon.com/images/I/61CeL9O2BYL._AC_UY436_FMwebp_QL65_.jpg'
    },
    {
      id: 4,
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with 16,000 DPI sensor',
      price: 59.99,
      imageUrl: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/83/6062553/1.jpg?9548'
    },
    {
      id: 5,
      name: 'USB-C Hub',
      description: '7-in-1 USB-C hub with HDMI, SD card reader, and PD charging',
      price: 39.99,
      imageUrl: 'https://m.media-amazon.com/images/I/613QrYgMSVL._AC_UY436_FMwebp_QL65_.jpg'
    },
    {
      id: 6,
      name: 'Portable SSD',
      description: '1TB external SSD with USB 3.2 Gen 2 speeds',
      price: 119.99,
      imageUrl: 'https://m.media-amazon.com/images/I/61zuR3UMnWL._AC_UY436_FMwebp_QL65_.jpg'
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