import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@app/api/services/auth.service';
import { Notify } from '@app/shared/service/notify.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private notify: Notify,
              private router: Router) {
    this.form = this.fb.group({
      token: [
        null,
      ],
      email: [
        null,
      ],
      password: [
        '',
        //AppValidators.password
      ],
      password_confirmation: [
        '',
        //AppValidators.password
      ]
    },
    {
     // validator: AppValidators.passwordConfirm
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.form.get('token').setValue(params.get('token'));
    });
    this.route.queryParamMap.subscribe(params => {
      this.form.get('email').setValue(params.get('email'));
    });
  }


  submit() {
    if (this.form.invalid) {
      //this.notify.showTranslated(_('forms.error'));
      return;
    }

    const data = this.form.getRawValue();
    this.form.disable();
    this.authService.passwordReset(data).pipe(
       finalize(() => this.form.enable())
    ).subscribe(
      success => {
      //  this.notify.showTranslated(_('passwords.success'));
        this.router.navigateByUrl('/login');
      },
      error => this.notify.error(error)
    );
  }

}
