import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingService } from '@app/api/services/setting.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { Notify } from '@app/shared/services/notify.service';
import { extract } from '@app/shared/services/i18n.service';
import { SelectMediaDialogComponent } from '@app/media/select-media-dialog/select-media-dialog.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { PostCkeditorComponent } from '@app/post/components/post-ckeditor/post-ckeditor.component';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  @ViewChild(PostCkeditorComponent) postCkEditor: PostCkeditorComponent;
  form: FormArray;

  constructor(private settingService: SettingService,
              private fb: FormBuilder,
              private notify: Notify,
              private dialog: MatDialog) {
    this.form = this.fb.array([]);
  }

  ngOnInit() {
    this.settingService.getCachedSettings().subscribe(settings => {
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
      }));
    });
  }

  submit() {
    this.settingService.set(this.form.getRawValue()).subscribe(settings => {
      this.fillForm(settings);
      this.settingService.setCachedSettings(settings);
      this.notify.showTranslated(extract('form.updatedSuccess'));
    });
  }
}
