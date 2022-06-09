import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InventoryService} from "../services/inventory.service";
import {InventoryItem} from "../models/InventoryItem";
import {ProductService} from "../services/product.service";
import {ProductItem} from "../models/ProductItem";

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  inventoryForm: FormGroup = new FormGroup({
    product: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });

  products: ProductItem[] = [];
  product!: ProductItem;

  constructor(private _inventoryService: InventoryService,
              private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(resp => {
      this.products = resp;
      console.log(this.products);
    });
  }

  onSubmit() {
    console.log(this.inventoryForm.get('product'))
    let inventory: any = {
      productId: this.inventoryForm.get('product')?.value['id'],
      size: this.inventoryForm.get('size')?.value.toUpperCase(),
      quantity: this.inventoryForm.get('quantity')?.value
    }

    console.log(inventory);
    this._inventoryService.addInventory(inventory);
  }

  changeProduct(value: any) {
    this.product = value;
  }
}
