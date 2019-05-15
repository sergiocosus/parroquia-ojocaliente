import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Setting, ValidSetting } from '@app/api/models/setting.model';
import { ReplaySubject } from 'rxjs';

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

  setCachedSettings(settings: Setting[]) {
    this.$settings.next(settings);
  }

  get() {
    return this.http.get('setting').pipe(this.mapSettings());
  }

  set(settings: { name: ValidSetting, content: string }[]) {
    return this.http.put('setting', {settings}).pipe(this.mapSettings());
  }

  private mapSettings() {
    return map(response => Setting.parseArray(response['page_settings']));
  }
}
