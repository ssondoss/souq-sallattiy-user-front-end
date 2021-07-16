import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css', '../app.component.css'],
})
export class CategoryComponent implements OnInit {
  categories = [
    'عروض',
    'ملابس',
    'ألعاب',
    'نثريات',
    'مستحضرات التجميل',
    'عطور',
    'نظارات',
    'إكسسورارت',
    'شنط ومحافظ ',
    'أدوات منزلية',
    'أجهزة كهربائية',
    'إلكترونيات',
    'هدايا',
    'ساعات',
    'مستلزمات أطفال',
  ];

  products: any;
  categoryId: any;
  arrayItems: Array<any> = new Array();
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    if (localStorage.getItem('shopping-cart') != null) {
      this.arrayItems = JSON.parse(
        localStorage.getItem('shopping-cart') || '[]'
      );
    }
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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.categoryId = params['id'];
      this.http
        .get(environment.apiURL + 'product/by-category/' + this.categoryId)
        .subscribe((data: any) => {
          this.products = data;
        });
    });
  }
  getImage(image: any) {
    return environment.imageURL + image;
  }
}
