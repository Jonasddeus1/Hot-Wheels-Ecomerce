import { Component } from '@angular/core';
import { HotWheelsCard } from "../../cards/hot-wheels-cards/hot-wheels-cards";
import { ProdutoService, TipoProduto } from '../../core/services/produto';

@Component({
  selector: 'app-home',
  imports: [HotWheelsCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  protected produtos: Array<TipoProduto> = [];
  constructor(private produtoService: ProdutoService){
    this.produtoService.getProducts().subscribe((produtos: Array<TipoProduto>) => {
      this.produtos = produtos;
    });
  }
}
