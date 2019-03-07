import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinksPageComponent } from './components/links-page/links-page.component';

const routes: Routes = [
  {
    path: '',
    component: LinksPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinksPageRoutingModule { }
