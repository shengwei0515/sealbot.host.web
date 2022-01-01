import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('src/app/pages/pages-routing.module').then((m) => m.PagesRoutingModule).catch(error => console.log(error)),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }