import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAddress} from "../models/UserAddress";

@Injectable({
  providedIn: 'root'
})
export class UserAddressesService {

  private readonly _addressUri = "http://localhost:8080/api/v1/addresses/"

  constructor(private _http: HttpClient) { }

  deleteAddressById(id: string) {
    let uri = this._addressUri + "delete/" + id;
    return this._http.delete(uri);
  }

  editAddress(address: any) {
    let uri = this._addressUri + "update/";
    return this._http.patch(uri, address);
  }

  addAddress(address: any) {
    let uri = this._addressUri + "add/";
    return this._http.post(uri, address);
  }
}
