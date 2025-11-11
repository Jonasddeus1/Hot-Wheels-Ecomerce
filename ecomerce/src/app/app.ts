import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from "./core/menu/menu";

@Component({
  selector: 'app-root',
  imports: [Menu, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  
}