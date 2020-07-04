import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { SettingService } from '@app/api/services/setting.service';
import { ValidSetting } from '@app/api/models/setting.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  $pageIconSrcSet: Observable<string | boolean>;
  $title: Observable<string | boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
              private settingService: SettingService) {
    this.$title = this.settingService.getCachedSetting(ValidSetting.title)
      .pipe(map(setting => setting.content));
    this.$pageIconSrcSet = this.settingService.getCachedSetting(ValidSetting.pageIcon)
      .pipe(map(setting => setting.content));
  }


  close() {
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        this.sidenav.close();
      } else {

      }
    });
  }

}
