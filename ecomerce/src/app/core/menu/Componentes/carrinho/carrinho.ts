import { Component } from '@angular/core';
import { ProdutoDoTipoCarrinho } from '../../../services/produto';
import { CarrinhoService } from '../../../services/carrinho';

@Component({
  selector: 'app-carrinho',
  imports: [],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss'
})
export class Carrinho {
    protected produtos!: ProdutoDoTipoCarrinho[];

    constructor(private carrinhoService: CarrinhoService) {
    this.carrinhoService.cartItemsHasChanged().subscribe((produtos: Array<ProdutoDoTipoCarrinho>) => {
      this.produtos = produtos;
    })
  }
}
