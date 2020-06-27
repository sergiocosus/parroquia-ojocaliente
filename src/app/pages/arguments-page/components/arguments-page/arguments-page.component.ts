import { Component, OnInit } from '@angular/core';
import { ArgumentService } from '@app/api/services/argument.service';
import { Argument } from '@app/api/models/argument.model';

@Component({
  selector: 'app-arguments-page',
  templateUrl: './arguments-page.component.html',
  styleUrls: ['./arguments-page.component.scss']
})
export class ArgumentsPageComponent implements OnInit {
  arguments: Argument[];

  constructor(private argumentService: ArgumentService) {
  }

  ngOnInit() {
    this.argumentService.get(null, null, null).subscribe(
      pagination => {
        this.arguments = pagination.data;
      }
    );
  }

}
