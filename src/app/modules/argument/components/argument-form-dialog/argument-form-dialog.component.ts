import { Component, Inject, OnInit } from '@angular/core';
import { Argument } from '@app/api/models/argument.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArgumentService } from '@app/api/services/argument.service';
import { Notify } from '@app/shared/services/notify.service';
import { extract } from '@app/shared/services/i18n.service';
import { uploadProgressOperator } from '@app/shared/functions/uploadProgressOperator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-argument-form-dialog',
  templateUrl: './argument-form-dialog.component.html',
  styleUrls: ['./argument-form-dialog.component.scss']
})
export class ArgumentFormDialogComponent implements OnInit {
  form: FormGroup;
  loading = 0;

  constructor(private fb: FormBuilder,
              private argumentService: ArgumentService,
              private notify: Notify,
              @Inject(MAT_DIALOG_DATA) public argument: Argument,
              private dialogRef: MatDialogRef<ArgumentFormDialogComponent>) {
    this.form = this.fb.group({
      answer: ['', Validators.required],
      question: ['', Validators.required],
    });

    this.initForm();
  }

  ngOnInit() {
  }

  private initForm() {
    if (this.argument) {
      this.form.reset({
        answer: this.argument.answer,
        question: this.argument.question,
      });
    } else {
      this.form.reset({});
    }
  }

  submit() {
    this.form.get('question').markAsTouched();
    if (this.form.invalid) {
      this.notify.showTranslated(extract('forms.error'));
      return;
    }

    const data = this.form.getRawValue();

    if (this.argument) {
      this.argumentService.edit(this.argument.id, data)
        .pipe(uploadProgressOperator(progress => this.loading = progress))
        .subscribe(argument => {
            this.dialogRef.close(argument);
            this.notify.showTranslated(extract('form.updatedSuccess'));
          },
          error => this.notify.error(error)
        );
    } else {
      this.argumentService.post(data)
        .pipe(uploadProgressOperator(progress => this.loading = progress))
        .subscribe(argument => {
            this.dialogRef.close(argument);
            this.notify.showTranslated(extract('form.createdSuccess'));
          },
          error => this.notify.error(error)
        );
    }
  }
}
