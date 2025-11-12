import { Component } from '@angular/core';
import { ProdutoDoTipoCarrinho } from '../../../services/produto';
import { CarrinhoService } from '../../../services/carrinho';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {
  protected produtos!: ProdutoDoTipoCarrinho[];
  protected carrinhoActive = false;
  constructor(private carrinhoService: CarrinhoService) {
    this.carrinhoService
      .carrinhoItemsHasChanged()
      .subscribe((produtos: Array<ProdutoDoTipoCarrinho>) => {
        this.produtos = produtos;
      });
  }

  removeItem(produtoId: string) {
    this.carrinhoService.removeItemById(produtoId);
  }
}
