import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderDotLineComponent } from './components/header-dot-line/header-dot-line.component';
import { SharedModule } from '../../shared/shared.module';
import { OrganizationModule } from '../organization/organization.module';

@NgModule({
  declarations: [FooterComponent, HeaderDotLineComponent],
  exports: [
    FooterComponent,
    HeaderDotLineComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        OrganizationModule
    ]
})
export class ElementsModule { }
