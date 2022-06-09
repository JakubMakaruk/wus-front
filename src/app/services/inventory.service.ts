import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {InventoryItem} from "../models/InventoryItem";
import {noop} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly _inventoryUri = "http://localhost:8080/api/v1/inventories"

  constructor(private _http: HttpClient) { }

  addInventory(inventory: InventoryItem) {
    let uri = this._inventoryUri + '/add';
    this._http.post(uri, inventory).subscribe(_ => noop());
  }

}
