import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  let email: string | null = null;

  if (isPlatformBrowser(platformId)) {
    email = localStorage.getItem('userEmail');
  }

  const isProductRequest = req.url.includes('/products');

  if (!email || !isProductRequest) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      'X-User-Email': email,
    },
  });

  return next(cloned);
};