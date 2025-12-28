import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar.component';
import { ProductCard } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('product-cart');
}
