import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _userUri = "http://localhost:8080/api/v1/users"

  constructor(private _http: HttpClient) { }

  getUserByEmail(email: string): Observable<User> {
    let uri = this._userUri + '/email';

    return this._http.post<User>(uri, { 'email': email });
  }

  editUser(user: any) {
    let uri = this._userUri + "/update";

    return this._http.patch(uri, user);
  }
}
