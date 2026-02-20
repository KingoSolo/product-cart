import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  successMessage = '';
  submitting = false;

  // Main FormGroup (required by assignment)
  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [null as number | null, [Validators.required, Validators.min(50)]],
    category: ['', [Validators.required]],
    imageUrl: [
      '',
      [Validators.required, Validators.pattern(/^https?:\/\/.+/)],
    ],
    inStock: [true],
    rating: [0, [Validators.min(0), Validators.max(5)]],

    // FormArray inside FormGroup (required by assignment)
    properties: this.fb.array([this.createPropertyGroup()]),
  });

  // Convenience getter for FormArray
  get properties(): FormArray<FormGroup> {
    return this.productForm.get('properties') as FormArray<FormGroup>;
  }

  // Create each FormGroup inside FormArray
  private createPropertyGroup(): FormGroup {
    return this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  addProperty(): void {
    this.properties.push(this.createPropertyGroup());
  }

  removeProperty(index: number): void {
    // Must keep at least 1 property (required)
    if (this.properties.length > 1) {
      this.properties.removeAt(index);
    }
  }

  // Helpers for template validation display
  isInvalid(controlName: string): boolean {
    const c = this.productForm.get(controlName);
    return !!c && c.touched && c.invalid;
  }

  propertyIsInvalid(index: number, controlName: 'color' | 'weight'): boolean {
    const group = this.properties.at(index);
    const c = group.get(controlName);
    return !!c && c.touched && c.invalid;
  }

  onSubmit(): void {
    this.successMessage = '';

    if (this.productForm.invalid) {
      // marks all controls touched so errors show
      this.productForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const formValue = this.productForm.value;

    // Build Product with correct keys (name/imageUrl, not title/image)
    const newProduct: Product = {
      name: formValue.name!,
      description: formValue.description!,
      price: Number(formValue.price),
      category: formValue.category!,
      imageUrl: formValue.imageUrl!,
      inStock: !!formValue.inStock,
      rating: Number(formValue.rating),
      properties: formValue.properties as any, // typed if your model includes it
    };

    this.productService.createProduct(newProduct).subscribe({
      next: (created) => {
        this.submitting = false;
        this.successMessage = `Product "${created.name}" created successfully!`;

        this.productForm.reset();
        // restore defaults and at least 1 property row
        this.productForm.patchValue({ inStock: true, rating: 0 });
        while (this.properties.length > 1) this.properties.removeAt(0);
        this.properties.at(0).reset();

        // Required: navigate back to product list
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.submitting = false;
        alert(err?.message ?? 'Failed to create product');
      },
    });
  }
}
