import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const email = localStorage.getItem('userEmail');

  // Only add header for product-related requests (json-server products endpoint)
  const isProductRequest =
    req.url.includes('/products');

  if (!email || !isProductRequest) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      'X-User-Email': email
    }
  });

  return next(cloned);
};
