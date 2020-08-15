import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { SharedModule } from '../../shared/shared.module';
import { OrganizationSocialLinksComponent } from './components/organization-social-links/organization-social-links.component';



@NgModule({
  declarations: [OrganizationFormComponent, OrganizationSocialLinksComponent],
  exports: [
    OrganizationFormComponent,
    OrganizationSocialLinksComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrganizationModule { }
