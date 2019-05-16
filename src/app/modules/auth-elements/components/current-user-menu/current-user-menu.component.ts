import { Component, OnInit } from '@angular/core';
import { User } from '@app/api/models/user.model';
import { SessionService } from '@app/api/services/session.service';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '@app/auth/components/login-dialog/login-dialog.component';
import { Observable } from 'rxjs';
import { ImpersonateUserService } from '@app/api/services/impersonate-user.service';
import { RouteConstants } from '@app/api/classes/route-constants';

@Component({
  selector: 'app-current-user-menu',
  templateUrl: './current-user-menu.component.html',
  styleUrls: ['./current-user-menu.component.scss']
})
@AutoUnsubscribe()
export class CurrentUserMenuComponent implements OnInit {
  readonly adminRoute = `/${RouteConstants.admin}/${RouteConstants.category}`;
  readonly adminPostsRoute = `/${RouteConstants.admin}/${RouteConstants.post}`;
  readonly newPostRoute = `/${RouteConstants.admin}/${RouteConstants.post}/${RouteConstants.new}`;
  readonly userRoute = `/${RouteConstants.admin}/${RouteConstants.user}`;
  readonly settingsRoute = `/${RouteConstants.admin}/${RouteConstants.settings}`;
  readonly linksRoute = `/${RouteConstants.admin}/${RouteConstants.link}`;

  sub = new SubscriptionManager();
  user: User;

  $impersonatorUser: Observable<User>;

  constructor(private sessionService: SessionService,
              private impersonateUserService: ImpersonateUserService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.$impersonatorUser = this.sessionService.getImpersonatedUser();
    this.sub.add = this.sessionService.getLoggedUser().subscribe(user => {
      this.user = user;
    });
  }

  stopImpersonate() {
    this.impersonateUserService.stopImpersonation().subscribe();
  }

  openLoginModal() {
    this.dialog.open(LoginDialogComponent);
  }
}
