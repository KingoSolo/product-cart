import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

const STORAGE_KEY = 'userEmail';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private authStateSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.authStateSubject.asObservable();

  constructor() {
    // Runs after DI is ready; safe to check browser here.
    this.authStateSubject.next(this.hasToken());
  }

  login(email: string): void {
    if (this.isBrowser) localStorage.setItem(STORAGE_KEY, email);
    this.authStateSubject.next(true);
  }

  logout(): void {
    if (this.isBrowser) localStorage.removeItem(STORAGE_KEY);
    this.authStateSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getCurrentUser(): string | null {
    return this.isBrowser ? localStorage.getItem(STORAGE_KEY) : null;
  }

  private hasToken(): boolean {
    return this.isBrowser && !!localStorage.getItem(STORAGE_KEY);
  }
}
