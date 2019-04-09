import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../api/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Notify } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-reset-password-request-dialog',
  templateUrl: './reset-password-request-dialog.component.html',
  styleUrls: ['./reset-password-request-dialog.component.scss']
})
export class ResetPasswordRequestDialogComponent implements OnInit {
  form: FormGroup;

  messages = {
    success: 'Se ha enviado el correo para restablecer la contraseña a ',
  };

  constructor(private dialog: MatDialogRef<ResetPasswordRequestDialogComponent>,
              private fb: FormBuilder,
              private authService: AuthService,
              private notify: Notify) {
    this.initForm();
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;

      this.authService.requestPasswordReset(email).subscribe(
        success => {
          this.notify.show(this.messages.success + email);
          this.dialog.close();
        },
        error => this.notify.error(error)
      );
    }
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

}
