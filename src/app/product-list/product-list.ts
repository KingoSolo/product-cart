import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './product-list.html',
})
export class ProductListComponent implements OnInit {
  readonly fallbackImage = '/images/product-placeholder.svg';

  private productService = inject(ProductService);
  protected stateService = inject(StateService);

  products = this.stateService.products;
  loading = this.stateService.loading;
  error = this.stateService.error;
  isEmpty = this.stateService.isEmpty;
  cartCount = this.stateService.cartCount;

  ngOnInit(): void {
    this.loadProducts();
  }

  

  loadProducts(): void {
    this.stateService.setLoading(true);

  this.productService.getAllProducts().subscribe({
    next: (products) => {
      console.log('PRODUCTS:', products);

      this.stateService.setProducts(products as any);
      this.stateService.setLoading(false);
    },
    error: (err) => {
      console.error('Error loading products:', err);
      this.stateService.setError('Failed to load products');
      this.stateService.setLoading(false);
    }
  });
  }

  addToCart(product: any): void {
    this.stateService.addToCart(product);
  }

  retryLoad(): void {
    this.stateService.clearError();
    this.loadProducts();
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.src = this.fallbackImage;
  }
}