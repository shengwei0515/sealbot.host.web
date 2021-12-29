import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: 'full',
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "error",
    component: ErrorPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }