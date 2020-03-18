import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthService } from '../service/auth.service';


const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'user',component:UserComponent},
  {path:'product',component:ProductComponent},
  {path:'profile',component:ProfileComponent},
  {path:'addUser',component:AddUserComponent},
  {path:'addUser/:_id',component:AddUserComponent},
  {path:'addProduct',component:AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
