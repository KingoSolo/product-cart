import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private state = signal<AppState>({
    products: [],
    cart: [],
    loading: false,
    error: null
  });

  products = computed(() => this.state().products);
  cart = computed(() => this.state().cart);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);


  cartCount = computed(() => 
    this.state().cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  cartTotal = computed(() => 
    this.state().cart.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    )
  );

  isEmpty = computed(() => this.state().products.length === 0);

  // State update methods (immutable)
  setProducts(products: Product[]): void {
    this.state.update(state => ({
      ...state,
      products,
      loading: false,
      error: null
    }));
  }

  addProduct(product: Product): void {
    this.state.update(state => ({
      ...state,
      products: [...state.products, product],
      loading: false,
      error: null
    }));
  }

  setLoading(loading: boolean): void {
    this.state.update(state => ({ ...state, loading }));
  }

  setError(error: string | null): void {
    this.state.update(state => ({ 
      ...state, 
      error,
      loading: false 
    }));
  }

  clearError(): void {
    this.setError(null);
  }

  addToCart(product: Product): void {
    this.state.update(state => {
      const existingItem = state.cart.find(
        item => item.product.id === product.id
      );

      let updatedCart: CartItem[];

      if (existingItem) {
        updatedCart = state.cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { product, quantity: 1 }];
      }

      return { ...state, cart: updatedCart };
    });
  }

  removeFromCart(productId: number): void {
    this.state.update(state => ({
      ...state,
      cart: state.cart.filter(item => item.product.id !== productId)
    }));
  }

  updateCartQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.state.update(state => ({
      ...state,
      cart: state.cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    }));
  }

  clearCart(): void {
    this.state.update(state => ({ ...state, cart: [] }));
  }

  resetState(): void {
    this.state.set({
      products: [],
      cart: [],
      loading: false,
      error: null
    });
  }
}