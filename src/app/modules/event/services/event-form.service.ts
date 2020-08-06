import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from '@app/api/services/event.service';
import { Event } from '@app/api/models/event.model';
import { CustomValidators } from 'ngx-custom-validators';

@Injectable({
  providedIn: 'root'
})
export class EventFormService {

  constructor(private fb: FormBuilder,
              private eventService: EventService) {
  }

  createForm(event?: Event) {
    const form = this.fb.group({
      id: event ? event.id : null,
      title: [event ? event.title : null, [
        Validators.required
      ]],
      description: [event ? event.description : null, [Validators.required]],
      address: [event ? event.address : null, [Validators.required]],
      begin_at: [event ? event.begin_at : null, [Validators.required]],
      end_at: [event ? event.end_at : null, [Validators.required]],
      range_at: [event ? [event.begin_at, event.end_at] : null, [Validators.required]],
      notify_at: [event ? event.begin_at : null, []],
      picture: [null, []],
      gallery_id: [event ? event.gallery_id : null, []],
      latitude: [event ? event.latitude : null, [
        CustomValidators.min(-90),
        CustomValidators.max(90),
      ]],
      longitude: [event ? event.longitude : null, [
        CustomValidators.min(-180),
        CustomValidators.max(180),
      ]],
    });

    form.get('range_at').valueChanges.forEach(
      range_at => {
        form.get('begin_at').setValue(range_at[0]);
        form.get('end_at').setValue(range_at[1]);
      }
    );

    return form;
  }

}
