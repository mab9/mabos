import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AbosComponent} from "./abos/abos.component";
import {AbosInlineComponent} from "./abos-inline/abos-inline.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'abos',
    component: AbosComponent
  },
  {
    path: 'abos-inline',
    component: AbosInlineComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
