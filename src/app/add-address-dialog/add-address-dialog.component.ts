import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {UserAddressesService} from "../services/user-addresses.service";

@Component({
  selector: 'app-add-address-dialog',
  templateUrl: './add-address-dialog.component.html',
  styleUrls: ['./add-address-dialog.component.scss']
})
export class AddAddressDialogComponent implements OnInit {

  addressForm: FormGroup = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    houseNumber: new FormControl('', [Validators.required]),
    postCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required])
  });

  constructor(private _authService: AuthService,
              private _userAddressService: UserAddressesService) { }

  ngOnInit(): void {
    this.addressForm.get('userId')?.setValue(this._authService.userValue.id)

  }

  onSubmit() {
    let address: any = {
      'userId': this.addressForm.get('userId')?.value,
      'street': this.addressForm.get('street')?.value,
      'houseNumber': this.addressForm.get('houseNumber')?.value,
      'postCode': this.addressForm.get('postCode')?.value,
      'city': this.addressForm.get('city')?.value
    }

    this._userAddressService.addAddress(address).subscribe(_ => this._authService.refreshUser(this._authService.userValue.email));
  }
}
