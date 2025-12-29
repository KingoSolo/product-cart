import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
@Component({
  selector: 'app-navbar',
  imports: [SearchInputComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  @Input() cartCount: number = 0; // Add this: receive cart length from parent
  @Output() searchQuery = new EventEmitter<string>(); // Add this: emit search to parent

  onSearch(query: string) {       // Add this method
    this.searchQuery.emit(query);
  }
}
