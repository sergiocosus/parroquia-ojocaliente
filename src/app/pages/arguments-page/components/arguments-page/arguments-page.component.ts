import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arguments-page',
  templateUrl: './arguments-page.component.html',
  styleUrls: ['./arguments-page.component.scss']
})
export class ArgumentsPageComponent implements OnInit {
  arguments = [
    {
      question: 'La vida humana comienza desde el momento de la concepción.\n',
      answer: 'Jerome Lejeune, médico francés y profesor emérito de Genética de la Universidad de París, afirma que “en cuanto los 23 cromosomas del espermatozoide se encuentran con los 23 cromosomas del óvulo, toda la información necesaria y suficiente está allí, reunida en el ADN para determinar las cualidades de un nuevo ser humano. [...] Afirmar que la vida humana comienza después de la fecundación, no es científico.”\n' +
        '\n' +
        'El Diccionario Médico Mosby’s Medical, Nursing and Allied Health Dictionary define el embarazo como “En el preciso y único momento de la concepción, la mujer está embarazada con un nuevo ser individual”.\n' +
        '\n',
    },
    {
      question: '¿Qué hace a un ser vivo un individuo de la especie humana?\n',
      answer: '« Novedad biológica: Nace un organismo nuevo, el cigoto, al fundirse los núcleos de las células.\n' +
        'Especificidad: Todo ser vivo pertenece a una especie, el embrión desde el momento de la concepción, pertenece a la especie humana.\n' +
        'Unidad: Si se trata de una individualidad biológica, de un todo compuesto de partes organizadas, tiene que haber un centro coordinador (genoma humano). »\n' +
        '\t(Marco Antonio Gracia Triñaque. (2019). Y LO SAPIENS... ¿DÓNDE QUEDÓ?, pp. 65. México)\n',
    },
    {
      question: '¿Qué pruebas existen que confirman la existencia de un nuevo ser durante el desarrollo en el embarazo?',
      answer: '« Autonomía: Todo el desarrollo sucede desde del principio hasta el final de manera autónoma, propiciado por el propio embrión y no por la madre.\n' +
        'La coordinación: Desde la unión de gametos y el desarrollo celular vemos que se da un proceso coordinado bajo el control del nuevo genoma, lo cual indica que nos encontramos ante un individuo.\n' +
        'La continuidad: Todo el proceso del nuevo ser humano se desarrolla con una sucesión ininterrumpida de acontecimientos, por lo que afirmamos que es siempre el mismo e idéntico ser el que se está formando. \n' +
        'La gradualidad: Está demostrado que la forma o el desarrollo final es gradual, está dentro del proceso de crecimiento de todo ser humano, lo que lleva a mantener siempre al is o individuo idéntico con autonomía.»\n',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
