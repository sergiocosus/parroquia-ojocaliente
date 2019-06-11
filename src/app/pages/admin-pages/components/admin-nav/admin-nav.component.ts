import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouteConstants } from '@app/api/classes/route-constants';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  readonly adminPages = RouteConstants.adminPages;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  close() {
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        this.sidenav.close();
      } else {

      }
    });
  }
}
