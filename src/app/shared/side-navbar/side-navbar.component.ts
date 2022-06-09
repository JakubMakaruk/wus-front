import {Component, Input, OnInit} from '@angular/core';
import { NavbarMenuItem } from "../../models/NavbarMenuItem";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  @Input() gender: string = '';
  @Input() category: string = '';
  @Input() products: string = '';

  sideNavItems: NavbarMenuItem[] = [];

  constructor(private _route: ActivatedRoute,
              private _categoryService: CategoryService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(_ => this.setSideNavItems());
  }


  setSideNavItems() {
    console.log('Ustawiam setSideNavItems');
    this.gender = this._route.snapshot.queryParams['gender'];
    this.category = this._route.snapshot.queryParams['category'];

    this._categoryService.getCategories(this.gender, this.category).subscribe(resp => this.sideNavItems = resp);
  }

  selectProducts(gender: string, category: string, products: string) {
    this._router.navigate(['products'], {queryParams: {gender: gender, category: category, products: products}}).then();
  }
}

