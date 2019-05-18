import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SettingService } from '@app/api/services/setting.service';
import { Setting } from '@app/api/models/setting.model';
import * as _ from 'lodash';

@Directive({
  selector: '[appIfSetting]'
})
export class IfSettingDirective {
  name: string;
  value: any;
  private settings: Setting[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private settingService: SettingService,
  ) {
    this.settingService.getCachedSettings().subscribe(settings => {
      this.settings = settings;
      this.check();
    });
  }


  @Input() set appIfSetting(name) {
    if (Array.isArray(name) && name.length > 1) {
      this.name = name[0];
      this.value = name[1];
    } else {
      this.name = name;
      this.value = true;
    }

    this.check();
  }

  check() {
    const setting = _.find(this.settings, ['name', this.name]);

    if (setting && setting.content === this.value) {
      if (!this.viewContainer.length) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
