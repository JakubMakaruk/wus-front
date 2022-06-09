import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserAddress} from "../models/UserAddress";
import {UserAddressesService} from "../services/user-addresses.service";
import {add} from "lodash";

@Component({
  selector: 'app-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./edit-address-dialog.component.scss']
})
export class EditAddressDialogComponent implements OnInit {

  addressForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    houseNumber: new FormControl('', [Validators.required]),
    postCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserAddress,
              private _authService: AuthService,
              private _userAddressService: UserAddressesService) { }

  ngOnInit(): void {
    this.addressForm.get('id')?.setValue(this.data.id);
    this.addressForm.get('userId')?.setValue(this._authService.userValue.id)
    this.addressForm.get('street')?.setValue(this.data.street);
    this.addressForm.get('houseNumber')?.setValue(this.data.houseNumber);
    this.addressForm.get('postCode')?.setValue(this.data.postCode);
    this.addressForm.get('city')?.setValue(this.data.city);
    console.log(this.data);
  }

  onSubmit() {
    let address: any = {
      'id': this.addressForm.get('id')?.value,
      'userId': this.addressForm.get('userId')?.value,
      'street': this.addressForm.get('street')?.value,
      'houseNumber': this.addressForm.get('houseNumber')?.value,
      'postCode': this.addressForm.get('postCode')?.value,
      'city': this.addressForm.get('city')?.value
    }

    this._userAddressService.editAddress(address).subscribe(_ => this._authService.refreshUser(this._authService.userValue.email))
  }
}
