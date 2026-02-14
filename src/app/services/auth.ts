import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const STORAGE_KEY = 'userEmail';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Tracks auth state. BehaviorSubject stores the latest value and emits to new subscribers.
  private authStateSubject = new BehaviorSubject<boolean>(this.hasToken());

  // Exposed observable so components can subscribe without being able to "next()" it.
  isAuthenticated$: Observable<boolean> = this.authStateSubject.asObservable();

  /** Login: store email as "token" and update state */
  login(email: string): void {
    localStorage.setItem(STORAGE_KEY, email);
    this.authStateSubject.next(true);
  }

  /** Logout: clear token and update state */
  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.authStateSubject.next(false);
  }

  /** Synchronous check (guards often prefer sync checks) */
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /** Returns the stored email (the "token") */
  getCurrentUser(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(STORAGE_KEY);
  }
}
