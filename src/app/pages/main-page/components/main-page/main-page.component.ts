import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  links = [
    {
      title: 'Conviértete, nadie está seguro cómo ni cuándo terminará su vida',
      url: 'http://es.catholic.net/op/articulos/72443/conviertete-porque-nadie-esta-seguro-ni-como-ni-cuando-terminara-su-vida.html'
    },
    {
      title: 'Ayuno y Abstinencia en la Iglesia Católica',
      url: 'https://www.aciprensa.com/recursos/ayuno-y-abstinencia-1923'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
