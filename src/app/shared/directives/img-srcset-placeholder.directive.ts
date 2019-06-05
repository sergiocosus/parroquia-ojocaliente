import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img'
})
export class ImgSrcsetPlaceholderDirective {
  constructor(private el: ElementRef) {
    if (!el.nativeElement.sizes.length) {
      el.nativeElement.sizes = '1px';
    }
  }

  @HostListener('load') onMouseEnter() {
    this.el.nativeElement.sizes = Math.ceil(
      this.el.nativeElement.getBoundingClientRect().width /
      window.innerWidth * 100
    ) + 'vw';
  }
}
