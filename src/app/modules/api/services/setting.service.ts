import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Setting, ValidSetting } from '@app/api/models/setting.model';
import { ReplaySubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private $settings = new ReplaySubject<Setting[]>(1);

  constructor(private http: HttpClient) {
    this.get().subscribe(s => this.setCachedSettings(s));
  }

  getCachedSettings() {
    return this.$settings.asObservable();
  }

  getCachedSetting(name) {
    return this.getCachedSettings().pipe(map(
      settings => _.find(settings, {name}))
    );
  }

  setCachedSettings(settings: Setting[]) {
    this.$settings.next(settings);
  }

  get() {
    return this.http.get('setting').pipe(this.mapSettings());
  }

  set(settings: { name: ValidSetting, content: string }[]) {
    return this.http.put('setting', {settings},
      {reportProgress: true, observe: 'events'}
    ).pipe(this.mapSettingsEvent());
  }

  private mapSettings() {
    return map(response => Setting.parseArray(response['page_settings']));
  }

  private mapSettingsEvent() {
    return map((response: HttpEvent<any>) => {
      if (response['type'] === HttpEventType.Response) {
        console.log(response);
        return Setting.parseArray(response.body['page_settings']);
      }
      return response;
    });
  }
}
