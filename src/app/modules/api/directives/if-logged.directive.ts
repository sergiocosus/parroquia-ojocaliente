import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '@app/api/models/user.model';
import { SessionService } from '@app/api/services/session.service';

@Directive({
  selector: '[appIfLogged]'
})
export class IfLoggedDirective {
  toBeLogged;
  private user: User;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private sessionService: SessionService,
  ) {
    this.sessionService.getLoggedUser().subscribe(user => {
      this.user = user;
      this.check();
    });
  }


  @Input() set appIfLogged(toBeLogged) {
    this.toBeLogged = toBeLogged;
    this.check();
  }

  check() {
    if ((!!this.user) === this.toBeLogged) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
