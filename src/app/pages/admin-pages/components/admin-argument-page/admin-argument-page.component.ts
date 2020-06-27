import { Component, OnInit } from '@angular/core';
import { RouteConstants } from '@app/api/classes/route-constants';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-argument-page',
  templateUrl: './admin-argument-page.component.html',
  styleUrls: ['./admin-argument-page.component.scss']
})
export class AdminArgumentPageComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

}
