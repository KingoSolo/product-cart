import { Component,EventEmitter,Input,Output } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;     // Receive product data
  @Input() selected: boolean = false; // Receive selected state
  @Output() productSelected = new EventEmitter<Product>(); // Emit when clicked

  onCardClick() {                 // Add this method
    this.productSelected.emit(this.product);
  }
}
