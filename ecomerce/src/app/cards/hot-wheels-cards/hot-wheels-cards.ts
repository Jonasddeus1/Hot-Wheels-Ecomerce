import { Component, Input } from '@angular/core';
import { ProdutoService, TipoProduto } from '../../core/services/produto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hot-wheels',
  imports: [RouterLink],
  templateUrl: './hot-wheels-cards.html',
  styleUrl: './hot-wheels-cards.scss',
})
export class HotWheelsCard {
  @Input()
  public produto!: TipoProduto;

  constructor(private produtoService: ProdutoService) {}

  delete() {
    this.produtoService.deleteProductById(this.produto.id).subscribe(() => {
      alert('Produto excluido com sucesso!');
      this.produtoService.reloadProductList();
    });
  }
}
