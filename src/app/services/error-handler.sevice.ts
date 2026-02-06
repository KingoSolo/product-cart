import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side/network error
      errorMessage = `Network Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = this.getServerErrorMessage(error);
    }

    console.error('Error Details:', error);
    console.error('User Message:', errorMessage);
    
    return throwError(() => new Error(errorMessage));
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Bad Request: Please check your input and try again.';
      case 401:
        return 'Unauthorized: Please log in to continue.';
      case 403:
        return 'Forbidden: You don\'t have permission to access this resource.';
      case 404:
        return 'Not Found: The requested resource could not be found.';
      case 500:
        return 'Internal Server Error: Something went wrong on our end. Please try again later.';
      case 503:
        return 'Service Unavailable: Server is temporarily unavailable.';
      default:
        return `Server Error (${error.status}): ${error.message}`;
    }
  }
}