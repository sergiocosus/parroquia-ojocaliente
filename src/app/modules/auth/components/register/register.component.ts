import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize } from 'rxjs/operators';
import { AuthService } from '@app/api/services/auth.service';
import { Notify } from '@app/shared/services/notify.service';
import { AppValidators } from '@app/shared/validators/app-validators';
import { User } from '@app/api/models/user.model';
import { extract } from '@app/shared/services/i18n.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  loading = false;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private notify: Notify,
              private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {

  }

  submit() {
    if (this.form.valid) {
      const data = this.form.getRawValue();
      this.loading = true;
      this.authService.register(this.form.getRawValue()).pipe(
        finalize(() => this.loading = false)
      ).subscribe(
        user => this.successLogin(user),
        error => this.notify.error(error)
      );
    }
  }

  private createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required,  ]],
      last_name: ['', [Validators.required, ]],
      password: ['', [Validators.required, Validators.minLength(6), AppValidators.password]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6), AppValidators.password]],
     // terms: [false, [AppValidators.value(true)]],
      invitation: null,
    }, {
      validator: AppValidators.passwordConfirm
    });
  }

  private successLogin(user: User) {
    this.loading = false;
    this.authService.redirectRouteAfterLogin();
    this.notify.showTranslated(extract('auth.successfulCredentials'));
  }

}
