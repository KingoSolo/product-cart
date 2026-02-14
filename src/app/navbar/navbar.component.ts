import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [SearchInputComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  @Input() cartCount: number = 0; 
  @Output() searchQuery = new EventEmitter<string>(); 

  onSearch(query: string) {       
    this.searchQuery.emit(query);
  }

   constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
}
}