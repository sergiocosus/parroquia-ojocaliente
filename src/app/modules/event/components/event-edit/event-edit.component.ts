import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventFormService } from '../../services/event-form.service';
import { MatDialog } from '@angular/material/dialog';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { Notify } from '@app/shared/services/notify.service';
import { EventService } from '@app/api/services/event.service';
import { Category } from '@app/api/models/category.model';
import { Event } from '@app/api/models/event.model';
import { uploadProgressOperator } from '@app/shared/functions/uploadProgressOperator';
import { extract } from '@app/shared/services/i18n.service';
import { GalleryService } from '@app/api/services/gallery.service';
import { Gallery } from '@app/api/models/gallery.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
@AutoUnsubscribe()
export class EventEditComponent implements OnInit {
  @Input() event: Event;

  @Output() created = new EventEmitter;
  @Output() updated = new EventEmitter;

  src: string = null;
  form: FormGroup;
  categories: Category[];
  loading = 0;
  galleries: Gallery[];

  constructor(private eventService: EventService,
              private fb: FormBuilder,
              private eventFormService: EventFormService,
              private notify: Notify,
              private galleryService: GalleryService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.form = this.eventFormService.createForm(this.event);
    this.galleryService.get().subscribe(galleries => this.galleries = galleries);
  }

  submit() {
    if (this.form.invalid) {
      this.notify.showTranslated('Hay errores en el formulario');
      return;
    }

    const eventData = this.form.value;

    if (this.event) {
      this.updateEvent(eventData);
    } else {
      this.createEvent(eventData);
    }
  }

  private createEvent(eventData) {
    this.eventService.post(eventData)
      .pipe(uploadProgressOperator(p => this.loading = p))
      .subscribe(
        event => {
          this.created.emit(event);
          this.notify.showTranslated(extract('form.createdSuccess'));
        },
        error => this.notify.error(error)
      );
  }

  private updateEvent(eventData) {
    this.eventService.put(this.event.slug, eventData)
      .pipe(uploadProgressOperator(p => this.loading = p))
      .subscribe(
        event => {
          this.updated.emit(event);
          this.notify.showTranslated(extract('form.updatedSuccess'));
        },
        error => this.notify.error(error)
      );
  }

  /*
  openMapModal() {
    this.dialog.open(SelectFromMapModalComponent, {
      data: {
        longitude: +this.form.get('longitude').value,
        latitude: +this.form.get('latitude').value
      }}).afterClosed().subscribe(
      coordinates => this.form.patchValue(coordinates)
    );
  }
  */
}
