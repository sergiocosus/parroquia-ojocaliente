import { Directive, ElementRef, HostBinding, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Directive({
  selector: 'img[srcset]'
})
export class ImgSrcsetPlaceholderDirective {
  loaded = false;
  @HostBinding('sizes') sizes = '1px';

  constructor(private el: ElementRef,
              @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformServer(this.platformId)) {
      return;
    }
  }

  @HostListener('load') load() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (!this.loaded) {
      this.loaded = true;
      this.sizes = Math.ceil(
        this.el.nativeElement.getBoundingClientRect().width /
        window.innerWidth * 100
      ) + 'vw';
    }
  }
}
