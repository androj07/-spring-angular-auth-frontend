import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";


const routes: Routes = [{
  path : '',
  redirectTo : 'products',
  pathMatch: 'full'
},{
  path:  'products',
  component : ProductsComponent,
  canActivate : [AuthGuard],
  data : {title : 'Products list'},
},{
  path : 'login',
  component: LoginComponent,
  data:{title:'Login'}
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
