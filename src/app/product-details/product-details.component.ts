import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css', '../app.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  arrayItems: Array<any> = new Array();

  productId: any;
  product: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    if (localStorage.getItem('shopping-cart') != null) {
      this.arrayItems = JSON.parse(
        localStorage.getItem('shopping-cart') || '[]'
      );
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.productId = params['id'];
      this.http
        .get(environment.apiURL + 'product/' + this.productId)
        .subscribe((data: any) => {
          this.product = data;
        });
    });
  }
  addToCart(product: any, count: any) {
    if (product.count > 0)
      this.arrayItems.push({ product: product, qty: count });
    localStorage.setItem('shopping-cart', JSON.stringify(this.arrayItems));
  }
  getQuantity(product: any) {
    for (const item of this.arrayItems) {
      if (product.id == item.product.id) {
        return item.qty;
      }
    }
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
