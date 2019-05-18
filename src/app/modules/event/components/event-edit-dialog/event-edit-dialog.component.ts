import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Event } from '@angular/router';

@Component({
  selector: 'app-event-edit-dialog',
  templateUrl: './event-edit-dialog.component.html',
  styleUrls: ['./event-edit-dialog.component.scss']
})
export class EventEditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public event: Event,
              private dialogRef: MatDialogRef<EventEditDialogComponent>) { }

  ngOnInit() {
  }

  close(event: Event) {
    this.dialogRef.close(event);
  }
}
