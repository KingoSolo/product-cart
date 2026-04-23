import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Category {
    id: number;
    name: string;
    description?: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/categories`

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }
}