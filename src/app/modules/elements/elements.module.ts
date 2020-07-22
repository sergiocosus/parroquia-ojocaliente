import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderDotLineComponent } from './components/header-dot-line/header-dot-line.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FooterComponent, HeaderDotLineComponent],
  exports: [
    FooterComponent,
    HeaderDotLineComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class ElementsModule { }
