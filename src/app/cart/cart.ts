import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../services/state.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
})
export class CartComponent {
  readonly fallbackImage = '/images/product-placeholder.svg';

  protected stateService = inject(StateService);

  cart = this.stateService.cart;
  cartCount = this.stateService.cartCount;
  cartTotal = this.stateService.cartTotal;

  updateQuantity(productId: Product['id'], quantity: number): void {
    this.stateService.updateCartQuantity(productId, quantity);
  }

  removeFromCart(productId: Product['id']): void {
    this.stateService.removeFromCart(productId);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.stateService.clearCart();
    }
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.src = this.fallbackImage;
  }
}