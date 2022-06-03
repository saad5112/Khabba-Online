import { Router, Data } from '@angular/router';
import { CartapiService } from './../services/cartapi.service';
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  Form,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public products: any[] = [];
  isEdit: boolean = false;
  uData!: FormGroup;
  currentProduct: any;
  updateUserID: any;
  // we store update data here in allProducts array
  // allProducts: any[] = [];
  // form!: Form;
  // id: any;
  constructor(
    private cartApi: CartapiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.uData = this.fb.group({
      category: [''],
      description: [''],
      price: [''],
      quantity: [''],
      rating: [''],
      title: [''],
      total: [''],
    });
  }
  onUpdate(): any {
    this.cartApi
      .updateBook(this.updateUserID, this.uData.value)
      .subscribe((err) => {
        console.log(err);
      });
    alert('Data Updated Successfully');
  }

  // updateDbData(updateUserID: any, item: any) {
  //   this.cartApi.updateOrder(updateUserID, item);
  // }

  ViewAllOrder() {
    this.cartApi.viewOrder().subscribe((res) => {
      this.products = res;
      // console.log(this.products);
    });
  }
  onEditClick(_id: any) {
    // Get the product on id
    // this.products.filter((res: any) => {
    //   console.log('Check VAl ::', res._id);
    // });
    this.isEdit = !this.isEdit;
    let currentProduct = this.products.find((p) => {
      this.updateUserID = _id;
      return p._id === _id;
    });

    // populate the form with product details
    this.uData.setValue({
      category: currentProduct.category,
      description: currentProduct.description,
      price: currentProduct.price,
      quantity: currentProduct.quantity,
      rating: currentProduct.rating,
      title: currentProduct.title,
      total: currentProduct.total,
    });
  }

  Gotoproducts() {
    this.router.navigate(['products']);
  }
}
