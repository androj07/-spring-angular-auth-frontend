import { Component, OnInit } from '@angular/core';
import {ProductService} from "./product.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Product} from "./product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  data: Product[];
  displayedColumns : string[] = ['id','name'];
  isLoadingResults : boolean = false;
  constructor(private productService : ProductService, private authService : AuthService, private router : Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() : void{
    this.productService.getProducts()
      .subscribe(products =>{
        this.data = products;
        this.isLoadingResults = false;
      }),err =>{
      this.isLoadingResults = false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
