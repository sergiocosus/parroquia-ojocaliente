import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/auth.service';
import { SessionService } from '@app/api/services/session.service';
import { User } from '@app/api/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ImpersonateUserService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private sessionService: SessionService,
              private router: Router) {
  }

  impersonate(user_id: number) {
    return this.http.post(`kiosk/user/impersonate/${user_id}`, {}).pipe(
      map(json => new User().parse(json['user'])),
      tap(() => this.authService.updateLoggedUserObservable().subscribe())
    );
  }

  stopImpersonation() {
    let loggedUser = null;
    return this.sessionService.getLoggedUser().pipe(
      tap(user => loggedUser = user),
      mergeMap(() => this.http.post('kiosk/user/impersonate/stop', {})),
      tap(() => this.authService.updateLoggedUserObservable().subscribe()),
      tap(() => this.router.navigateByUrl('/spark/kiosk/users/' + loggedUser.id))
    );
  }
}
