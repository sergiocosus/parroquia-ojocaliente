import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { BLOG_API_CONFIG, BlogApiConfig } from '../types/api-config';
import { SessionService } from './session.service';
import { UserService } from '@app/api/services/user.service';
import { User } from '@app/api/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logoutRoute = '/';
  loginRoute = '/';

  constructor(@Inject(BLOG_API_CONFIG) private config: BlogApiConfig,
              @Inject(PLATFORM_ID) private platformId: Object,
              private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private sessionService: SessionService) {
    this.updateLoggedUserObservable().subscribe();
  }


  login(email: string, password: string) {
    const urlSearchParams = new HttpParams()
      .append('grant_type', 'password')
      .append('client_id', this.config.apiClientID)
      .append('client_secret', this.config.apiClientSecret)
      .append('username', email)
      .append('password', password);
    const body = urlSearchParams.toString();

    return this.loginOAuth(body);
  }

  private loginOAuth(body: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post('oauth/token', body, {headers: headers}).pipe(
      mergeMap((data: any) => {
          this.sessionService.setAccessToken(data.access_token);
          return this.updateLoggedUserObservable();
        }
      ));
  }

  logout() {
    this.sessionService.removeAccessToken();
    this.updateLoggedUserObservable({logout: true}).subscribe();
  }

  register(data: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    team_slug: string;
  }) {
    return this.http.post('auth/register', data).pipe(mergeMap(
      user => this.login(data.email, data.password)
    ));
  }


  updateLoggedUserObservable(data = {logout: false}) {
    return new Observable<User>((obs) => {
      if (data.logout) {
        this.sessionService.setLoggedUser(null);

        this.router.navigateByUrl(this.logoutRoute);
      } else {
        if (isPlatformServer(this.platformId)) {
          return;
        }

        this.userService.getMe().subscribe(
          sessionData => {
            console.log(sessionData);
            const user = sessionData.user;
            this.sessionService.setLoggedUser(user);
            this.sessionService.setImpersonatorUser(sessionData.impersonator_user);

            obs.next(user);
            obs.complete();
          },
          error => {
            console.error(error);
            this.sessionService.setLoggedUser(null);
            obs.error(error);
            obs.complete();
          }
        );
      }
    });
  }

  passwordReset(data: {
    token: string,
    password: string,
    password_confirmation: string,
    email: string,
  }) {
    return this.http.post('auth/password/reset', data);
  }

  redirectRouteAfterLogin() {
    if (this.sessionService.requestedRouteWithoutAuth) {
      this.router.navigateByUrl(this.sessionService.requestedRouteWithoutAuth);
      this.sessionService.requestedRouteWithoutAuth = null;
    } else {
      this.router.navigateByUrl(this.loginRoute);
    }
  }

  requestPasswordReset(email) {
    return this.http.post('auth/password/email', {email: email});
  }
}
