import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService, TipoProduto } from '../../../core/services/produto';
import { CarrinhoService } from '../../../core/services/carrinho';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-detalhes-produto',
  imports: [ReactiveFormsModule],
  templateUrl: './detalhes-produto.html',
  styleUrl: './detalhes-produto.scss',
})
export class DetalhesProduto {
  private produtoId!: string;
  protected produto!: TipoProduto;
  protected formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private formBuilder: FormBuilder
  ) {
    this.produtoId = this.route.snapshot.paramMap.get('id') || '';
    this.produtoService.getProductById(this.produtoId).subscribe((result: TipoProduto) => {
      this.produto = result;
    });

    this.formGroup = this.formBuilder.group({
      quantity: ['1'],
      observations: ['teste', Validators.required],
    });

    this.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.formGroup.get('quantity')?.valueChanges.subscribe((value) => {
      console.log('Quantity changed:', value);
      if (value < 1) {
        this.formGroup.get('observations')?.disable();
      } else {
        this.formGroup.get('observations')?.enable();
      }
    });
  }

  adicionarAoCarrinho() {
    if (this.formGroup.invalid) {
      alert('Por favor, preencha os campos corretamente.');
      return;
    }

    this.carrinhoService.addItem({
      ...this.produto,
      ...this.formGroup.value,
    });
  }

  mais() {
    let qtd = this.formGroup.get('quantity')?.value || 0;
    this.formGroup.get('quantity')?.setValue(parseInt(qtd) + 1);
  }

  menos() {
    let qtd = this.formGroup.get('quantity')?.value || 0;
    this.formGroup.get('quantity')?.setValue(Math.max(parseInt(qtd) - 1, 0));
  }
}
