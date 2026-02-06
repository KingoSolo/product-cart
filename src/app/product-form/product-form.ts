import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
})
export class ProductFormComponent {
  private productService = inject(ProductService);
  protected stateService = inject(StateService);

  title = signal('');
  price = signal<number | null>(null);
  description = signal('');
  category = signal('');
  image = signal('');

  submitting = signal(false);
  successMessage = signal('');
  formError = signal('');

  error = this.stateService.error;
  loading = this.stateService.loading;

  onSubmit(): void {
    // Clear previous messages
    this.formError.set('');
    this.successMessage.set('');
    this.stateService.clearError();

    // Validation
    if (!this.title() || !this.price() || !this.description() || !this.category() || !this.image()) {
      this.formError.set('Please fill in all fields');
      return;
    }

    if (this.price()! <= 0) {
      this.formError.set('Price must be greater than 0');
      return;
    }

    this.submitting.set(true);

    const newProduct = {
      title: this.title(),
      price: this.price()!,
      description: this.description(),
      category: this.category(),
      image: this.image(),
    };

    this.productService.createProduct(newProduct).subscribe({
      next: (product) => {
        this.submitting.set(false);
        this.successMessage.set(`Product "${product.title}" created successfully!`);
        this.resetForm();
        
       
        setTimeout(() => this.successMessage.set(''), 5000);
      },
      error: (err) => {
        this.submitting.set(false);
        console.error('Error creating product:', err);
        this.stateService.setError('Failed to create product. Please try again.');
      }
    });
  }

  resetForm(): void {
    this.title.set('');
    this.price.set(null);
    this.description.set('');
    this.category.set('');
    this.image.set('');
    this.formError.set('');
  }
}