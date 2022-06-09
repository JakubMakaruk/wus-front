import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {UserAddress} from "../models/UserAddress";
import {UserAddressesService} from "../services/user-addresses.service";
import {noop} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {EditAddressDialogComponent} from "../edit-address-dialog/edit-address-dialog.component";
import {AddAddressDialogComponent} from "../add-address-dialog/add-address-dialog.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  faPlus = faPlus;

  userForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });

  constructor(private _userService: UserService,
              private _authService: AuthService,
              private _userAddresses: UserAddressesService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userForm.get('firstname')?.setValue(this._authService.userValue.firstname)
    this.userForm.get('lastname')?.setValue(this._authService.userValue.lastname)
    this.userForm.get('phone')?.setValue(this._authService.userValue.phone)
  }

  get userValue() {
    return this._authService.userValue;
  }

  onSubmit() {
    let user: any = {
      'firstname': this.userForm.get('firstname')?.value,
      'lastname': this.userForm.get('lastname')?.value,
      'email': this._authService.userValue.email,
      'password': this._authService.userValue.password,
      'phone': this.userForm.get('phone')?.value
    }

    this._userService.editUser(user).subscribe(_ => this._authService.refreshUser(this._authService.userValue.email));
  }

  addNewAddress() {
    const dialogRef = this.dialog.open(AddAddressDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((_: any) => this.dialog.closeAll());
  }

  editAddress(address: UserAddress) {
    const dialogRef = this.dialog.open(EditAddressDialogComponent, {
      width: '250px',
      data: address
    });

    dialogRef.afterClosed().subscribe((_: any) => this.dialog.closeAll());
  }

  deleteAddress(id: string) {
    this._userAddresses.deleteAddressById(id).subscribe(_ => this._authService.refreshUser(this.userValue.email));
  }
}
