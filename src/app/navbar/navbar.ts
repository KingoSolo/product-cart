import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchInput } from '../search-input/search-input';
@Component({
  selector: 'app-navbar',
  imports: [SearchInput],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

}
