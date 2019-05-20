import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { SettingService } from '@app/api/services/setting.service';
import { ValidSetting } from '@app/api/models/setting.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  title: string;
  pageIconSrcSet: string;

  constructor(private breakpointObserver: BreakpointObserver,
              private settingService: SettingService) {
    this.settingService.getCachedSetting(ValidSetting.title).subscribe(
      setting => this.title = setting.content as string
    );
    this.settingService.getCachedSetting(ValidSetting.pageIcon).subscribe(
      setting => this.pageIconSrcSet = setting.image_srcset
    );
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
