import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}
  searchTerm = '';

 
onSearch() {
  this.filteredProducts = this.products.filter(p =>
    p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


    ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      console.log('PRODUCTS FROM API:', products);
      this.products = products;
      this.filteredProducts = products;
    });
  }



  onProductClick(product: Product) {
    this.router.navigate(
      ['/products', product.id],
      { queryParams: { category: 'Electronics' } }
    );
  }
}

