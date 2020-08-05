import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [OrganizationFormComponent],
  exports: [
    OrganizationFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrganizationModule { }
