import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {noop} from "rxjs";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;

  get emailInput() { return this.loginForm.get('email'); }
  get passwordInput() { return this.loginForm.get('password'); }

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private router: Router,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('onsubmit');
    this._authService.login(this.emailInput?.value, this.passwordInput?.value).pipe(first())
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.router.navigate(['/products']).then(noop);
        }
      });
  }

}
