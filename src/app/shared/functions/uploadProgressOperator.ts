import { filter, finalize, tap } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { pipe } from 'rxjs';
import { Model } from '@app/api/models/model';

export function uploadProgressOperator(
  fn: (loading: number) => void,
  model = Model) {

  return pipe(
    finalize(() => fn(0)),
    tap((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        fn((event.loaded / event.total) * 100);
      }
    }),
    filter(event => event instanceof model)
  );
}
