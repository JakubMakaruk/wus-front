import {Component, OnInit, ViewChild} from '@angular/core';
import { NavbarMenuItem } from "../../models/NavbarMenuItem";
import { Router } from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../../auth/login-dialog/login-dialog.component";
import {AuthService} from "../../auth/auth.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  womenClothingArray: NavbarMenuItem[] = [];
  womenShoesArray: NavbarMenuItem[] = [];
  womenAccessoriesArray: NavbarMenuItem[] = [];

  menClothingArray: NavbarMenuItem[] = [];
  menShoesArray: NavbarMenuItem[] = [];
  menAccessoriesArray: NavbarMenuItem[] = [];

  kidsClothingArray: NavbarMenuItem[] = [];
  kidsShoesArray: NavbarMenuItem[] = [];
  kidsAccessoriesArray: NavbarMenuItem[] = [];

  get userLogged(): boolean {
    return this._authService.userValue != null;
  }

  constructor(private _router: Router,
              public dialog: MatDialog,
              private _categoryService: CategoryService,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  selectProducts(gender: string, category: string, products: string) {
    console.log(this.userLogged);
    this._router.navigate(['products'], {queryParams: {gender: gender, category: category, products: products}}).then();
  }

  getAllCategories() {
    this.getSpecificCategory('women', 'clothing').subscribe(resp => this.womenClothingArray = resp);
    this.getSpecificCategory('women', 'shoes').subscribe(resp => this.womenShoesArray = resp);
    this.getSpecificCategory('women', 'accessories').subscribe(resp => this.womenAccessoriesArray = resp);
    this.getSpecificCategory('men', 'clothing').subscribe(resp => this.menClothingArray = resp);
    this.getSpecificCategory('men', 'shoes').subscribe(resp => this.menShoesArray = resp);
    this.getSpecificCategory('men', 'accessories').subscribe(resp => this.menAccessoriesArray = resp);
    this.getSpecificCategory('kids', 'clothing').subscribe(resp => this.kidsClothingArray = resp);
    this.getSpecificCategory('kids', 'shoes').subscribe(resp => this.kidsShoesArray = resp);
    this.getSpecificCategory('kids', 'accessories').subscribe(resp => this.kidsAccessoriesArray = resp);
  }

  getSpecificCategory(gender: string, type: string) {
    return this._categoryService.getCategories(gender, type);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe();
  }

  logout() {
    this._authService.logout();
  }

  navigateToAdminPanel() {
    this._router.navigate(['admin']);
  }

  navigateToUserDetails() {
    this._router.navigate(['user/settings'])
  }
}
