import { Component, OnInit } from '@angular/core';
import {ProductItem} from "../models/ProductItem";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  gender!: string;
  category!: string;
  productType!: string;

  public products: ProductItem[] = [];

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: any) => {
      this.gender = params['gender'];
      this.category = params['category'];
      this.productType = params['products'];

      this.load();
    });
  }

  load() {
    this._productService.getProducts(this.gender, this.category, this.productType).subscribe(resp => {
      this.products = resp;
    });
  }

  navigateToDetails(productId: string) {
    this._router.navigate([productId], {relativeTo: this._route}).then();
  }
}
