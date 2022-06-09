import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {NavbarMenuItem} from "../models/NavbarMenuItem";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Category} from "../models/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly _categoryUri = "http://localhost:8080/api/v1/categories"

  constructor(private _http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(this._categoryUri);
  }

  getCategories(gender?: string, productType?: string): Observable<NavbarMenuItem[]> {
    let uri = this._categoryUri;
    if (gender !== '' && productType) {
      uri += '?gender=' + gender + '&type=' + productType;
    }
    return this._http.get<NavbarMenuItem[]>(uri);
  }

  getCategory(gender: string, productType: string, key: string): Observable<Category> {
    let uri = this._categoryUri;
    if (gender !== '' && productType) {
      uri += '?gender=' + gender + '&type=' + productType + "&key=" + key;
    }
    return this._http.get<Category>(uri);
  }

}
