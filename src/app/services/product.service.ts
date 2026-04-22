import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ErrorHandlerService } from './error-handler.sevice';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getAllProducts(): Observable<Product[]> {
    console.log('FETCHING PRODUCTS...');
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError((err) => throwError(() => new Error(this.errorHandler.handleError(err))))
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => throwError(() => new Error(this.errorHandler.handleError(err))))
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError((err) => throwError(() => new Error(this.errorHandler.handleError(err))))
    );
  }
}
