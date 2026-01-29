import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(50)]],
      category: ['', Validators.required],
      imageUrl: [
        '',
        [Validators.required, Validators.pattern('https?://.+')]
      ],
      inStock: [true],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      properties: this.fb.array([this.createProperty()])
    });

  }


    get properties(): FormArray {
    return this.productForm.get('properties') as FormArray;
  }

  createProperty(): FormGroup {
    return this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  addProperty() {
    this.properties.push(this.createProperty());
  }

  removeProperty(index: number) {
    if (this.properties.length > 1) {
      this.properties.removeAt(index);
    }
  }
onSubmit() {
  if (this.productForm.invalid) return;

  this.productService.createProduct(this.productForm.value)
    .subscribe(() => {
      alert('Product created successfully!');
      this.productForm.reset();
      this.router.navigate(['/']);
    });
}
}