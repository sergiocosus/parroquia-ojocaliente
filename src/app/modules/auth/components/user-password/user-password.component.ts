import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { UserService } from '@app/api/services/user.service';
import { SessionService } from '@app/api/services/session.service';
import { Notify } from '@app/shared/services/notify.service';
import { User } from '@app/api/models/user.model';
import { AppValidators } from '@app/shared/validators/app-validators';
import { extract } from '@app/shared/services/i18n.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private notify: Notify,
              private userService: UserService,
              private dialog: MatDialog,
              private sessionService: SessionService) {
    this.createPasswordForm();
  }

  ngOnInit() {
    this.sessionService.getLoggedUser().subscribe(
      user => this.user = user
    );
  }

  private createPasswordForm() {
    this.passwordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      password: ['', [Validators.required,  Validators.minLength(6), AppValidators.password]],
      password_confirmation: ['', [Validators.required,  Validators.minLength(6), AppValidators.password]],
    }, {
      validator: AppValidators.passwordConfirm
    });
  }

  submitPassword() {
    this.passwordForm.disable();
    this.userService.changePassword(this.passwordForm.getRawValue()).pipe(
      finalize(() => this.passwordForm.enable())
    ).subscribe(
      success => this.notify.showTranslated(extract('user.passwordChangedSuccessfully')),
      error => this.notify.error(error)
    );
  }
}
