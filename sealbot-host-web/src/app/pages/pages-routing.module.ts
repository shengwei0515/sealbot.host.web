import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginPageComponent } from './login-page/login-page.component';
import { TwitchLoginPageComponent } from './twitch-login-page/twitch-login-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: 'full',
  },
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "twitch-login",
    component: TwitchLoginPageComponent,
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