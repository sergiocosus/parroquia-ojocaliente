import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSnackBarModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingButtonComponent } from '@app/shared/components/loading-button/loading-button.component';
import { LoadingFormButtonComponent } from '@app/shared/components/loading-form-button/loading-form-button.component';
import { FormButtonDirective } from '@app/shared/directives/form-button.directive';
import { ApiModule } from '@app/api/api.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LaravelPaginatorComponent } from '@app/shared/components/laravel-paginator/laravel-paginator.component';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    LoadingButtonComponent,
    LoadingFormButtonComponent,
    FormButtonDirective,
    UploadPictureComponent,
    LaravelPaginatorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    ImageCropperModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,

    NgxPermissionsModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    ApiModule,

    ConfirmDialogComponent,
    LoadingButtonComponent,
    LoadingFormButtonComponent,
    FormButtonDirective,
    UploadPictureComponent,
    LaravelPaginatorComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ]
})
export class SharedModule { }
