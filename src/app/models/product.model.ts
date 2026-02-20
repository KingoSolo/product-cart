export interface ProductProperty {
  color: string;
  weight: string;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  properties?: ProductProperty[];
}
