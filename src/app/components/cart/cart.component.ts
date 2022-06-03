import { HttpClient } from '@angular/common/http';
import { PostApiService } from '../../services/update-api.service';
import { Router } from '@angular/router';
import { CartapiService } from './../../services/cartapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any = [];
  allProducts: number = 0;
  constructor(private cartApi: CartapiService, private router: Router) {}

  ngOnInit(): void {
    this.cartApi.getProductData().subscribe((res) => {
      this.products = res;
      this.allProducts = this.cartApi.getTotalAmout();
    });
  }

  PostData(item: any) {
    this.cartApi.createOrder(item).subscribe((res) => {
      res = item;
      alert('Data successfully saved to Data base');
    });
  }

  removeProduct(item: any) {
    this.cartApi.removeCartData(item);
  }

  removeAllProduct() {
    this.cartApi.removeAllCart();
  }

  Gotoproducts() {
    this.router.navigate(['products']);
  }
  GotoOrders() {
    this.router.navigate(['orders']);
  }
}
