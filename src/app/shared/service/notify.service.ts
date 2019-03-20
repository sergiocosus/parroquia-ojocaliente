import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Notify {

  constructor(private snackBar: MatSnackBar
  ) {
  }

  show(message: string) {
    this.snackBar.open(message, 'Cerrar', {duration: 5000});
  }

  error(error) {
    const messages = [];
    console.log(error);
    if (error.errors) {
      for (const propertyName in error.errors) {
        error.errors[propertyName].forEach(text => messages.push(text));
      }
      this.show(messages.join(' | '));
    } else {
      this.show(error.message);
    }
    console.error(error);
  }

}
