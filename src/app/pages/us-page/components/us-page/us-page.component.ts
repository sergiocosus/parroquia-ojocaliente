import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-us-page',
  templateUrl: './us-page.component.html',
  styleUrls: ['./us-page.component.scss']
})
export class UsPageComponent implements OnInit {

  people = [
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
    {
      picture: '',
      name: 'Juan López'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
