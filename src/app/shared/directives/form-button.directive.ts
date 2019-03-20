import { Directive, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appFormButton]'
})
export class FormButtonDirective {
  @Input() appFormButton: FormGroup;

  constructor() {
  }

  @HostBinding('disabled') get isDisabled() {
    return this.appFormButton.pristine || !this.appFormButton.enabled;
  }

}
