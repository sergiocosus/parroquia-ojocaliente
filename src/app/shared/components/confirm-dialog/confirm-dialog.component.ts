import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { extract } from '@app/shared/service/i18n.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData = {},
              private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    this.dialogRef.addPanelClass('traky-dialog-style');
  }

  ngOnInit() {
  }

  accept() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}

export interface ConfirmDialogData {
  title?: string;
  titleParam?: any;
  message?: string;
  acceptText?: string;
  cancelText?: string;
  cancelAsPrimary?: boolean;
  buttonColor?: string;
}

extract('common.confirmMessage');
