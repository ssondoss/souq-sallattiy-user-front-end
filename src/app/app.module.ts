import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { PopoverModule } from 'ngx-smart-popover';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ApplicationStateService } from './app.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CategoryComponent,
    CheckoutComponent,
    ContactUsComponent,
    AllProductsComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopoverModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatFormFieldModule,
    BrowserAnimationsModule,
    Ng2CarouselamosModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ApplicationStateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
