import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductItem} from "../models/ProductItem";
import {ProductService} from "../services/product.service";
import {InventoryItem} from "../models/InventoryItem";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  cartItemForm: FormGroup = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    houseNumber: new FormControl('', [Validators.required]),
    postCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required])
  });

  product!: ProductItem;

  constructor(private _route: ActivatedRoute,
              private _productService: ProductService) { }

  ngOnInit(): void {
    const productId = this._route.snapshot.paramMap.get('id');

    let weights: any = {
      'XS':1,
      'S':2,
      'M':3,
      'L':4,
      'Xl':5
    };

    // NAPISAC TO
    this._productService.getProductById(productId).subscribe((resp: ProductItem) => {
      resp.inventory?.sort((a, b) => weights[a.size] - weights[b.size]);
      this.product = resp;
      console.log(this.product);
    });
  }

  onSubmit() {

  }
}
