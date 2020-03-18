import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApphomeComponent } from './apphome.component';


const routes: Routes = [
  {path:'',component:ApphomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApphomeRoutingModule { }
