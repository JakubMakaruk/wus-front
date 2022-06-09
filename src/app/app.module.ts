import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatMenuModule} from "@angular/material/menu";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsPageComponent } from './products-page/products-page.component';
import { SideNavbarComponent } from './shared/side-navbar/side-navbar.component';
import {MatListModule} from "@angular/material/list";
import { ProductsComponent } from './products/products.component';
import {MatDialogModule} from "@angular/material/dialog";
import { LoginDialogComponent } from './auth/login-dialog/login-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { UniqueCategoryPipe } from './shared/unique-category.pipe';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminNavbarComponent } from './shared/admin-navbar/admin-navbar.component';
import {CapitalizeFirstLetterPipe} from "./shared/capitalize-first-letter.pipe";
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { ProductDetailsSettingsComponent } from './product-details-settings/product-details-settings.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditAddressDialogComponent } from './edit-address-dialog/edit-address-dialog.component';
import { AddAddressDialogComponent } from './add-address-dialog/add-address-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    ProductsPageComponent,
    SideNavbarComponent,
    ProductsComponent,
    LoginDialogComponent,
    ProductDetailsComponent,
    UniqueCategoryPipe,
    CapitalizeFirstLetterPipe,
    AdminPageComponent,
    AddProductComponent,
    AdminNavbarComponent,
    AddInventoryComponent,
    ProductDetailsSettingsComponent,
    UserDetailsComponent,
    EditAddressDialogComponent,
    AddAddressDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule,
    FontAwesomeModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,
    FormsModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
