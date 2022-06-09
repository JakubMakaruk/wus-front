import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductItem} from "../models/ProductItem";
import {noop, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _productUri = "http://localhost:8080/api/v1/products"

  constructor(private _http: HttpClient) { }

  getProducts(gender?: string, category?: string, productType?: string): Observable<ProductItem[]> {
    let uri = this._productUri + '?';
    if (gender) {
      uri += 'gender=' + gender;
    }
    if (category) {
      uri += '&category=' + category;
    }
    if (productType) {
      uri += '&key=' + productType;
    }

    console.log(uri);

    return this._http.get<ProductItem[]>(uri);
  }

  getProductById(id: string | null) {
    let uri = this._productUri + "/" + id;
    return this._http.get<ProductItem>(uri);
  }

  addProduct(product: ProductItem): void {
    let uri = this._productUri + '/add';
    console.log(uri);
    console.log(product);

    this._http.post<ProductItem>(uri, product).subscribe(resp => console.log(resp));
  }

  editProduct(product: any) {
    let uri = this._productUri + '/update';
    return this._http.patch(uri, product).subscribe(_ => noop());
  }
}
