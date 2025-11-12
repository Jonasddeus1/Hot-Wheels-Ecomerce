import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private productsMustBeReloadedSubject: Subject<boolean> = new Subject();
  private produtosSubject: BehaviorSubject<Array<TipoProduto>> = new BehaviorSubject<
    Array<TipoProduto>
  >([]);

  constructor(private http: HttpClient, private router: Router) {}

  public reloadProductList() {
    this.productsMustBeReloadedSubject.next(true);
  }

  public productsMustBeReloaded(): Observable<boolean> {
    return this.productsMustBeReloadedSubject.asObservable();
  }

  public getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/produtos');
  }

  public getProductById(id: string): any {
    return this.http.get(`http://localhost:3000/produtos/${id}`);
  }

  deleteProductById(id: string) {
    return this.http.delete(`http://localhost:3000/produtos/${id}`);
  }

  public addProduct(value: Partial<TipoProduto>) {
    this.getProducts().subscribe((produtos) => {
      let maxId = 0;
      produtos.forEach((el: any) => {
        if (parseInt(el.id) > maxId) {
          maxId = parseInt(el.id);
        }
      });
      maxId = maxId + 1;

      value.id = `${maxId}`;
      this.http.post('http://localhost:3000/produtos', value).subscribe(() => {
        alert('Produto inserido!');
        this.reloadProductList();
        this.router.navigate(['/produtos']);
      });
    });
  }
}

export interface TipoProduto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
}

export interface ProdutoDoTipoCarrinho extends TipoProduto {
  quantity?: number;
  observations?: string;
}
