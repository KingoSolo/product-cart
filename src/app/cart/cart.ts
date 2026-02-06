import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
})
export class CartComponent {
  protected stateService = inject(StateService);

  cart = this.stateService.cart;
  cartCount = this.stateService.cartCount;
  cartTotal = this.stateService.cartTotal;

  updateQuantity(productId: number, quantity: number): void {
    this.stateService.updateCartQuantity(productId, quantity);
  }

  removeFromCart(productId: number): void {
    this.stateService.removeFromCart(productId);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.stateService.clearCart();
    }
  }
}