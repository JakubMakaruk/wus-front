import { Component, OnInit } from '@angular/core';
import { faTShirt, faShop, faPen } from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  faTShirt = faTShirt;
  faShop = faShop;
  faPen = faPen;

  constructor(private _router: Router,
              private _route: ActivatedRoute,) { }

  ngOnInit(): void {
  }

  navigateToAddProduct() {
    this._router.navigate(['product/add'], {relativeTo: this._route}).then();
  }

  navigateToEditProduct() {
    this._router.navigate(['product/settings'], {relativeTo: this._route}).then();
  }

  navigateToAddInventory() {
    this._router.navigate(['inventory/add'], {relativeTo: this._route}).then();
  }
}
