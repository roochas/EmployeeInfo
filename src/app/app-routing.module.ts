import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFormComponent } from './list-form/list-form.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'list-form',component:ListFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
