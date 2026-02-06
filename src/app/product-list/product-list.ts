import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  protected stateService = inject(StateService);

  products = this.stateService.products;
  loading = this.stateService.loading;
  error = this.stateService.error;
  isEmpty = this.stateService.isEmpty;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      error: (err) => {
        console.error('Error loading products:', err);
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
}