import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationStateService } from '../app.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css'],
})
export class NavbarComponent implements OnInit {
  show = false;
  showSide = false;
  constructor(
    private router: Router,
    public appService: ApplicationStateService
  ) {}
  showFiller = false;

  ngOnInit(): void {}
  showShoppingCart() {
    this.show = true;
  }
  closeShoppingCart() {
    this.show = false;
  }
  clickSideNav() {
    this.showFiller = !this.showFiller;
  }

  getProductsCount() {
    let qty = 0;
    let products = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
    for (const item of products) {
      qty += item.qty;
    }
    return qty;
  }

  search(key: any) {
    this.router.navigate(['/all-products'], { queryParams: { key: key } });
  }
}
