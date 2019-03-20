import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '@app/api/services/session.service';


/**
 * Protect routes that require and authenticated account
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLogged = false;

  constructor(private sessionService: SessionService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.sessionService.getLoggedUser().pipe(map(
      user => {
        const notLogged = route.data['notLogged'];

        if (user) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
          if (!notLogged) {
            this.sessionService.requestedRouteWithoutAuth = state.url;
          }
        }

        if (notLogged) {
          if (this.isLogged) {
            this.router.navigateByUrl('/dashboard');
          }
          return !this.isLogged;
        } else {
          if (!this.isLogged) {
            this.router.navigateByUrl('/login');
          }
          return this.isLogged;
        }

      }
    ), take(1));
  }

}
