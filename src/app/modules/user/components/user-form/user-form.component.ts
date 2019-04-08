import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { extract } from '@app/shared/service/i18n.service';
import { finalize } from 'rxjs/operators';
import { UserService } from '@app/api/services/user.service';
import { Notify } from '@app/shared/service/notify.service';
import { SessionService } from '@app/api/services/session.service';
import { User } from '@app/api/models/user.model';
import { AuthService } from '@app/api/services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private notify: Notify,
              private sessionService: SessionService,
              private authService: AuthService) {
    this.form = this.fb.group({
      name: [],
      last_name: [],
      profile: [],
    });
  }

  ngOnInit() {
    this.sessionService.getLoggedUser().subscribe(user => {
      this.user = user;
      this.form.reset({
        name: user.name,
        last_name: user.last_name,
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }

    const data = this.form.getRawValue();
    this.form.disable();
    this.userService.putMe(data).pipe(
      finalize(() => this.form.enable())
    ).subscribe(
      user => {
        this.authService.updateLoggedUserObservable().subscribe();
        this.form.reset();
      },
      error => this.notify.error(error)
    );
  }
}
