// @dynamic

import * as moment from 'moment';

export class Model {
  parse(obj): any {
    for (var prop in obj) this[prop] = obj[prop];

   // this.parseDateTimes(['created_at', 'updated_at', 'deleted_at']);

    return this;
  }

  replaceProperties(obj) {
    for (const prop in this) {
      if (Object.getOwnPropertyDescriptor(this, prop) && typeof this[prop] !== 'function') {
        this[prop] = obj[prop];
      }
    }
    return this;
  }

  parseDateTimes(datesArray: string[]) {
    datesArray.forEach(field => {
      if (this[field]) {
        this[field] = moment(this[field]);
      }
    });
  }

}
