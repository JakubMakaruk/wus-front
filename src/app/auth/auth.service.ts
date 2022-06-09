import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BehaviorSubject, noop, Observable} from "rxjs";
import {User} from "../models/User";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _authUri = "http://localhost:8080/api/v1/auth";

  private userSubject: BehaviorSubject<User>;
  private user: Observable<User>;


  constructor(private _http: HttpClient,
              private router: Router,
              private jwtHelper :JwtHelperService,
              private userService: UserService) {
    console.log('constructor authService');
    // @ts-ignore
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
    console.log(this.userValue);
  }

  get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    let uri = this._authUri + '/login';

    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this._http.post(uri, body.toString(), options).pipe(map((res: any) => {
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);

      let decodedToken = this.jwtHelper.decodeToken(res.access_token);

      this.userService.getUserByEmail(decodedToken.sub).subscribe(resp => {
        this.userSubject.next(new User(resp, res.access_token));
        console.log(this.userValue);
      });
    }))
  }

  refreshUser(email: string) {
    this.userService.getUserByEmail(email).subscribe(resp => {
      this.userValue.firstname = resp.firstname;
      this.userValue.lastname = resp.lastname;
      this.userValue.phone = resp.phone;
      this.userValue.addresses = resp.addresses;
    });
  }

  logout() {
    localStorage.clear();
    // @ts-ignore
    this.userSubject.next(null);
    this.router.navigate(['']).then(noop);
  }

  refreshToken() {
    let uri = this._authUri + '/token/refresh';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('refresh_token') as string });

    return this._http.post(uri, null, { headers: headers }).pipe(map((res: any) => {
      localStorage.setItem('access_token', res.access_token);
      let decodedToken = this.jwtHelper.decodeToken(res.access_token);

      this.userService.getUserByEmail(decodedToken.sub).subscribe(resp => {
        this.userSubject.next(new User(resp, res.access_token));
        console.log(this.userValue);
      });
    }));
  }
}
