import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Carrinho } from "./Componentes/carrinho/carrinho";
import { CarrinhoService } from '../services/carrinho';
import { TipoProduto } from '../services/produto';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, Carrinho],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  protected produtoQtd: number = 0;
  protected carrinhoActive: boolean = false;

  constructor(private carrinhoService: CarrinhoService) {
    this.carrinhoService.cartItemsHasChanged().subscribe((produtos: Array<TipoProduto>) => {
      this.produtoQtd = produtos.length;
    })
  }

  protected showCart() {
    this.carrinhoActive = true;
  }
}
