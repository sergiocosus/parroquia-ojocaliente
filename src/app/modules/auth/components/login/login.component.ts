import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../api/services/auth.service';
import { Router } from '@angular/router';
import { ResetPasswordRequestDialogComponent } from '../reset-password-request-dialog/reset-password-request-dialog.component';
import { MatDialog } from '@angular/material';
import { User } from '@app/api/models/user.model';
import { Notify } from '@app/shared/service/notify.service';
import { RouteConstants } from '@app/api/classes/route-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly registerRoute = `/${RouteConstants.register}`
  @Output() logged = new EventEmitter();

  form: FormGroup;
  loading = false;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private notify: Notify) {
    this.createForm();
  }

  ngOnInit() {

  }

  submit() {
    if (this.form.valid) {
      const data = this.form.getRawValue();
      this.loading = true;
      this.authService.login(data['email'], data['password'])
        .subscribe(
          user => this.successLogin(user),
          error => this.errorLogin(error)
        );
    }
  }

  openResetPasswordRequestDialog() {
    this.dialog.open(ResetPasswordRequestDialogComponent);
  }

  private createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,  /*Validators.minLength(6), AppValidators.password*/]],
    });
  }

  private successLogin(user: User) {
    this.loading = false;
    this.authService.redirectRouteAfterLogin();
    this.logged.emit(user);
   // this.notify.showTranslated(extract('auth.successfulCredentials'));
  }

  private errorLogin(error) {
    this.loading = false;
    if (error.error === 'invalid_credentials') {
     // this.notify.showTranslated(extract('auth.invalidCredentials'));
    }
  }
}
