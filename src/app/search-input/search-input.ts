import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {
searchQuery = '';
  @Output() searchChanged = new EventEmitter<string>();

  onChange() {
    this.searchChanged.emit(this.searchQuery);
  }
}