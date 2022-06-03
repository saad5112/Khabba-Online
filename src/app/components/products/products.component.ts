import { CartapiService } from './../../services/cartapi.service';
import { Router } from '@angular/router';
import { ProductServiceService } from './../../services/product-service.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: any[] = [];
  constructor(
    private serv: ProductServiceService,
    private router: Router,
    private cartApi: CartapiService
  ) {}

  ngOnInit(): void {
    this.serv.getProducts().subscribe((res) => {
      this.products = res;
      this.products.forEach((a: any) => {
        Object.assign(a, {
          quantity: 1,
          total: a.price,
        });
      });
    });
  }
  addtocart(item: any) {
    this.cartApi.addProduct(item);
  }

  Gotocart() {
    this.router.navigate(['cart']);
  }
}
