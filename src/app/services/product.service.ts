import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.sevice';
import { StateService, Product } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);
  private stateService = inject(StateService);

  private apiUrl = 'https://fakestoreapi.com/products';


  getAllProducts(): Observable<Product[]> {
    this.stateService.setLoading(true);
    this.stateService.clearError();
    
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => {
        this.stateService.setProducts(products);
      }),
      catchError(error => {
        const errorMessage = error.message || 'Failed to load products';
        this.stateService.setError(errorMessage);
        return this.errorHandler.handleError(error);
      })
    );
  }

 
  getProductById(id: number): Observable<Product> {
    this.stateService.setLoading(true);
    this.stateService.clearError();
    
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.stateService.setLoading(false)),
      catchError(error => {
        const errorMessage = error.message || 'Failed to load product';
        this.stateService.setError(errorMessage);
        return this.errorHandler.handleError(error);
      })
    );
  }


  createProduct(product: Partial<Product>): Observable<Product> {
    this.stateService.setLoading(true);
    this.stateService.clearError();
    
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(newProduct => {
        this.stateService.addProduct(newProduct);
      }),
      catchError(error => {
        const errorMessage = error.message || 'Failed to create product';
        this.stateService.setError(errorMessage);
        return this.errorHandler.handleError(error);
      })
    );
  }
}