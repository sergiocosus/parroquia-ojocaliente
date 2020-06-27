import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArgumentsPageComponent } from './components/arguments-page/arguments-page.component';

const routes: Routes = [
  {
    path: '',
    component: ArgumentsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArgumentsPageRoutingModule { }
