import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';
import swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css', '../app.component.css'],
})
export class CheckoutComponent implements OnInit {
  products: any;
  orderForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.products = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
  }
  getProductsCount() {
    let qty = 0;
    let products = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
    for (const item of products) {
      qty += item.qty;
    }
    return qty;
  }
  editQuantity(product: any, count: any) {
    let i = 0;
    for (const item of this.products) {
      if (product.id == item.product.id) {
        if (item.qty + count == 0) {
          this.products.splice(i, 1);
        }
        if (product.count >= item.qty + count) {
          item.qty += count;
        }
      }
      ++i;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(this.products));
  }
  getTotal() {
    let total = 0;
    for (const item of this.products) {
      total += item.product.price * item.qty;
    }
    return total;
  }
  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
          // prettier-ignore
          Validators.pattern("[0-9]*"),
        ]),
      ],
      notes: [''],
      country: ['الأردن'],

      city: ['', Validators.compose([Validators.required])],
    });
  }

  placeOrder() {
    if (this.orderForm.valid && this.products.length > 0)
      this.http
        .post(environment.apiURL + 'order', {
          name: this.orderForm.controls['name'].value,
          addressDetails: this.orderForm.controls['address'].value,
          notes: this.orderForm.controls['notes'].value,
          phone: this.orderForm.controls['phone'].value,
          id: uuid.v4(),
          products: this.products,
          city: this.orderForm.controls['city'].value,
          country: 'Jordan',
          total: this.getTotal(),
        })
        .subscribe((res) => {
          localStorage.clear();
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تم إرسال تفاصيل طلبك بنجاح ',
            showConfirmButton: false,
            timer: 1500,
          });
          this.orderForm.reset();
        });
    else if (this.products.length == 0) {
      swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'عربة تسوقك فارغة',
        showConfirmButton: false,
        timer: 1500,
      });
    } else this.orderForm.markAllAsTouched();
  }

  getImage(image: any) {
    return environment.imageURL + image;
  }
}
