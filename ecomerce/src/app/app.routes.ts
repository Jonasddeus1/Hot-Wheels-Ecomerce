import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DetalhesProduto } from './pages/detalhes-produto/detalhes-produto/detalhes-produto';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'produto/:id', component: DetalhesProduto},    
];
