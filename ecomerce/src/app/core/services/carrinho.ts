import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProdutoDoTipoCarrinho } from './produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

   private carrinhoItems = new BehaviorSubject<Array<ProdutoDoTipoCarrinho>>([]);

  public addItem(item: ProdutoDoTipoCarrinho): void {
    let carrinhoItems = this.carrinhoItems.getValue();

    const alreadyOnCart = carrinhoItems.find(el => el.id == item.id);
    if (alreadyOnCart) {
      alreadyOnCart.quantity = parseInt(`${alreadyOnCart.quantity || 0}`) + parseInt(`${(item.quantity || 0)}`);
    } else {
      carrinhoItems.push(item);
    }
    this.carrinhoItems.next(carrinhoItems);    
  }

  public cartItemsHasChanged() : Observable<Array<ProdutoDoTipoCarrinho>> {
    return this.carrinhoItems.asObservable();
  }

  removeItemById(produtoId: number) {
    let produtos = this.carrinhoItems.getValue();
    console.log(produtos);    
    produtos = produtos.filter((el) => el.id != produtoId);
    console.log(produtos)
    this.carrinhoItems.next(produtos);
  }
}
