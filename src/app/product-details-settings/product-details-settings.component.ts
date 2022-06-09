import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {ProductItem} from "../models/ProductItem";
import {Category} from "../models/Category";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-product-details-settings',
  templateUrl: './product-details-settings.component.html',
  styleUrls: ['./product-details-settings.component.scss']
})
export class ProductDetailsSettingsComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    title: new FormControl('',),
    description: new FormControl(''),
    brand: new FormControl(''),
    price: new FormControl(''),
    covers: new FormControl('')
  });

  products: ProductItem[] = [];
  categories: Category[] = [];

  selectedProduct!: ProductItem;
  selectedCategory!: Category;

  constructor(private _categoryService: CategoryService,
              private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(resp => {
      this.products = resp;
    });
    this._categoryService.getAllCategories().subscribe(resp => {
      this.categories = resp;
    });
  }

  onSubmit() {
    let product: any = {
      'id': this.selectedProduct.id,
      'gender': this.selectedProduct.gender,
      'productType': this.selectedProduct.productType,
      'productKey': this.selectedProduct.productKey,
      'title': this.productForm.get('title')?.value,
      'description': this.productForm.get('description')?.value,
      'brand': this.productForm.get('brand')?.value,
      'price': this.productForm.get('price')?.value,
      'covers': [this.productForm.get('covers')?.value]
    }

    this._productService.editProduct(product);
  }

  changeProduct(value: any) {
    this.selectedProduct = value;

    console.log(this.selectedProduct);

    this._categoryService.getCategory(value.gender, value.productType, value.productKey).subscribe((resp: any) => {
      this.selectedCategory = resp[0];

      this.productForm.get('category')?.setValue(this.selectedCategory);
      this.productForm.get('title')?.setValue(this.selectedProduct.title);
      this.productForm.get('description')?.setValue(this.selectedProduct.description);
      this.productForm.get('brand')?.setValue(this.selectedProduct.brand);
      this.productForm.get('price')?.setValue(this.selectedProduct.price);
      this.productForm.get('covers')?.setValue(this.selectedProduct.covers[0]);
      this.productForm.updateValueAndValidity();

      console.log(this.productForm);
    });
    // this._categoryService.getCategories(this.selectedProduct.gender, this.selectedProduct.productType).subscribe(resp as C => this.selectedCategory = resp);
  }
}
