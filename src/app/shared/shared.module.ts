import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { ImgSrcsetPlaceholderDirective } from './directives/img-srcset-placeholder.directive';
import { MatSelectModule } from '@angular/material/select';
import { CovalentFileModule } from '@covalent/core/file';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    LoadingButtonComponent,
    LoadingFormButtonComponent,
    FormButtonDirective,
    UploadPictureComponent,
    LaravelPaginatorComponent,
    ImgSrcsetPlaceholderDirective,
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
    CovalentFileModule,
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
    MatSelectModule,

    NgxPermissionsModule,
    OwlDateTimeModule,
    ApiModule,

    ConfirmDialogComponent,
    LoadingButtonComponent,
    LoadingFormButtonComponent,
    FormButtonDirective,
    UploadPictureComponent,
    LaravelPaginatorComponent,
    ImgSrcsetPlaceholderDirective,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ]
})
export class SharedModule {
}
