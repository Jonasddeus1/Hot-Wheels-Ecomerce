import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtosSubject: BehaviorSubject<Array<TipoProduto>> = new BehaviorSubject<Array<TipoProduto>>([]);

  constructor() {
    this.produtosSubject.next([
      {
        id: 1,
        nome: 'Nissan Skyline',
        preco: 12.99,
        categoria: 'Carrinhos',
        imagem: './img/produto/skyline.jpg'
      },
      {
        id: 2,
        nome: 'Toyota Supra',
        preco: 12.99,
        categoria: 'Carrinhos',
        imagem: './img/produto/supra.jpg'
      },
      {
        id: 3,
        nome: 'Nissan 370 Z',
        preco: 12.99,
        categoria: 'Carrinhos',
        imagem: './img/produto/370z.jpg'
      },
      {
        id: 4,
        nome: 'Mazda RX-7',
        preco: 12.99,
        categoria: 'Carrinhos',
        imagem: './img/produto/rx7.jpg'
      },
      {
        id: 5,
        nome: 'Dodge Charge',
        preco: 12.99,
        categoria: 'Carrinhos',
        imagem: './img/produto/charge.jpg'
      }
    ])
  }

  public getProducts(): Observable<Array<TipoProduto>> {
    return this.produtosSubject.asObservable();
  }

  public getProductById(id: number): any {
    const produtos = this.produtosSubject.getValue();
    return produtos.find((item: TipoProduto) => item.id == id);
  }

    deleteProductById(id: number) {
    const produtos = this.produtosSubject.getValue().filter((item: TipoProduto) => item.id != id);
    this.produtosSubject.next(produtos);
  }
}

export interface TipoProduto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
}

export interface ProdutoDoTipoCarrinho extends TipoProduto {
  quantity?: number;
  observations?: string;
}