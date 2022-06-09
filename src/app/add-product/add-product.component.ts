import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../models/Category";
import {CategoryService} from "../services/category.service";
import {ProductService} from "../services/product.service";
import {ProductItem} from "../models/ProductItem";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required ]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    covers: new FormControl('', [Validators.required])
  });

  categories: Category[] = [];

  constructor(private _categoryService: CategoryService,
              private _productService: ProductService) { }

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(resp => {
      this.categories = resp;
    });
  }

  show() {
    console.log(this.productForm);
  }

  onSubmit() {
    let product: any = {
      gender: this.productForm.get('category')?.value['gender'],
      productType: this.productForm.get('category')?.value['productType'],
      productKey: this.productForm.get('category')?.value['key'],
      title: this.productForm.get('title')?.value,
      description: this.productForm.get('description')?.value,
      brand: this.productForm.get('brand')?.value,
      price: this.productForm.get('price')?.value,
      covers: [this.productForm.get('covers')?.value]
    }

    console.log(product);

    this._productService.addProduct(product);
  }
}
