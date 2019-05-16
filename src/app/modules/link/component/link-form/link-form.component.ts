import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})
export class LinkFormComponent implements OnInit {
  @Input() theForm: FormGroup;
  @Output() ngSubmit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
