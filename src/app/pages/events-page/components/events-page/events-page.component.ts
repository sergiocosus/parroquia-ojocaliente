import { Component, OnInit } from '@angular/core';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  ngOnInit(): void {
  }

}

