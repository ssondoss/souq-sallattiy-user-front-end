import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css', '../app.component.css'],
})
export class AllProductsComponent implements OnInit {
  searchKey: any;
  arrayItems: Array<any> = new Array();

  products: any;
  constructor(
    private http: HttpClient,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    if (localStorage.getItem('shopping-cart') != null) {
      this.arrayItems = JSON.parse(
        localStorage.getItem('shopping-cart') || '[]'
      );
    }
    this.activatedRouter.queryParams.subscribe((params: any) => {
      this.searchKey = params['key'];
      console.log(this.searchKey);
      if (this.searchKey != undefined)
        this.http
          .get(environment.apiURL + 'product/by-name/' + this.searchKey)
          .subscribe((data: any) => {
            this.products = data;
          });
      else
        this.http.get(environment.apiURL + 'product').subscribe((data) => {
          this.products = data;
          console.log(data);
        });
    });
  }
  addToCart(product: any, count: any) {
    if (product.count > 0)
      this.arrayItems.push({ product: product, qty: count });
    localStorage.setItem('shopping-cart', JSON.stringify(this.arrayItems));
  }
  inCart(product: any) {
    for (const item of this.arrayItems) {
      console.log(item);
      if (product.id == item.product.id) {
        return true;
      }
    }
    return false;
  }
  ngOnInit(): void {}
  getQuantity(product: any) {
    for (const item of this.arrayItems) {
      if (product.id == item.product.id) {
        return item.qty;
      }
    }
  }
  editQuantity(product: any, count: any) {
    let i = 0;
    for (const item of this.arrayItems) {
      if (product.id == item.product.id) {
        if (item.qty + count == 0) {
          this.arrayItems.splice(i, 1);
        }
        if (product.count >= item.qty + count) {
          item.qty += count;
        }
      }
      ++i;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(this.arrayItems));
  }
  getImage(image: any) {
    return environment.imageURL + image;
  }
}
