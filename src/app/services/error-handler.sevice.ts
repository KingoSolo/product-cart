import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  handleError(error: any): string {
    // NEVER reference ErrorEvent directly (SSR doesn't have it)
    const isClientError = !!error && typeof error === 'object' && 'error' in error === false;

    // Handle typical HttpErrorResponse shape
    const message =
      error?.error?.message ||
      error?.message ||
      (typeof error === 'string' ? error : 'Unknown error');

    // You can customize these labels if you want
    return isClientError ? `Client error: ${message}` : `Server error: ${message}`;
  }
}
