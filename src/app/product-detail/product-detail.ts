import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html'
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  category = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.category = this.route.snapshot.queryParamMap.get('category') || '';

    this.productService.getProductById(id).subscribe(product => {
      this.product = {
        ...product,
        name: product.title,
        imageUrl: product.image
      };
    });
  }
}
