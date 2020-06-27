import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsPageComponent } from './components/us-page/us-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsPageRoutingModule { }
