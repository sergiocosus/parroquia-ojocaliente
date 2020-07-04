import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingService } from '@app/api/services/setting.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { Notify } from '@app/shared/services/notify.service';
import { extract } from '@app/shared/services/i18n.service';
import { MatDialog } from '@angular/material';
import { PostCkeditorComponent } from '@app/post/components/post-ckeditor/post-ckeditor.component';
import { Setting } from '@app/api/models/setting.model';
import * as _ from 'lodash';
import { uploadProgressOperator } from '@app/shared/functions/uploadProgressOperator';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  @ViewChild(PostCkeditorComponent, {static: false}) postCkEditor: PostCkeditorComponent;
  form: FormArray;
  private settings: Setting[];
  loading: number;

  constructor(private settingService: SettingService,
              private fb: FormBuilder,
              private notify: Notify,
              private dialog: MatDialog) {
    this.form = this.fb.array([]);
  }

  ngOnInit() {
    this.settingService.getCachedSettings().subscribe(settings => {
      this.settings = settings;
      this.fillForm(settings);
    });
  }

  private fillForm(settings) {
    while (this.form.length !== 0) {
      this.form.removeAt(0);
    }
    settings.forEach(setting => {
      this.form.push(this.fb.group({
        name: setting.name,
        content: setting.content,
        type: setting.type,
        picture: null,
      }));
    });
  }

  getSettingSrset(name: string) {
    return _.find(this.settings, {name}).image_srcset;
  }


  submit() {
    this.settingService.set(this.form.getRawValue())
      .pipe(uploadProgressOperator(p => this.loading = p))
      .subscribe(settings => {
        this.fillForm(settings);
        this.settingService.setCachedSettings(settings);
        this.notify.showTranslated(extract('form.updatedSuccess'));
      });
  }
}
