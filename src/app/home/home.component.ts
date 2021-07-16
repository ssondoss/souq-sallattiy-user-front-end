import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css'],
})
export class HomeComponent implements OnInit {
  sliderProducts: any;
  arrayItems: Array<any> = new Array();

  constructor(private http: HttpClient) {
    if (localStorage.getItem('shopping-cart') != null) {
      this.arrayItems = JSON.parse(
        localStorage.getItem('shopping-cart') || '[]'
      );
    }
    this.http.get(environment.apiURL + '/product/latest').subscribe((res) => {
      this.sliderProducts = res;
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
  ngOnInit(): void {}
  getImage(image: any) {
    return environment.imageURL + image;
  }
}
