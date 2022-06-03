import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartapiService {
  cartDataList: any = [];
  products = new BehaviorSubject<any>([]);
  REST_API: string = 'http://localhost:8000/api/cart';
  constructor(private http: HttpClient) {}

  createOrder(item: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/cart/', item);
  }

  updateBook(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/Update/${id}`;
    return this.http.put(API_URL, data);
  }

  getProductData() {
    return this.products.asObservable();
  }
  setProduct(product: any) {
    this.cartDataList.push(product);
    this.products.next(product);
  }
  addProduct(product: any) {
    this.cartDataList.push(product);
    this.products.next(this.cartDataList);
    this.getTotalAmout();
  }
  getTotalAmout() {
    let grandTotal = 0;
    this.cartDataList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }
  removeCartData(product: any) {
    this.cartDataList.map((a: any, index: any) => {
      if (product.id == a.id) {
        this.cartDataList.splice(index, 1);
      }
    });
  }
  viewOrder(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/cart/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  removeAllCart() {
    this.cartDataList = [];
    this.products.next(this.cartDataList);
  }
}
