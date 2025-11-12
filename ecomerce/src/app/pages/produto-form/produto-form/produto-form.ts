import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../../core/services/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-form',
  imports: [ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.scss'
})
export class ProdutoForm {
  protected formGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSubmit() {
    const value = this.formGroup.value;

    if (!this.formGroup.valid) {
      alert('Preencha os campos em vermelho!');
      return;
    }

    this.produtoService.addProduct(value);
    alert('Produto adicionado!');
    this.router.navigate(['/products']);
  }
}
