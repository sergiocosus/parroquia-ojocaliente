import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '@app/api/models/pagination';

@Component({
  selector: 'app-laravel-paginator',
  templateUrl: './laravel-paginator.component.html',
  styleUrls: ['./laravel-paginator.component.scss']
})
export class LaravelPaginatorComponent implements OnInit {
  @Input() pagination: Pagination<any>;
  @Output() page = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
