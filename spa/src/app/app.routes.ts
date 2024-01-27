import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AbosComponent} from "./abos/abos.component";
import {AbosInlineComponent} from "./abos-inline/abos-inline.component";
import {DASH} from "@angular/cdk/keycodes";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AbosReactiveComponent} from "./abos-reactive/abos-reactive.component";
import {DashyComponent} from "./dashy/dashy.component";

export const routes: Routes = [
  { path: '',            component: HomeComponent },
  { path: 'login',       component: LoginComponent },
  { path: 'dashy',       component: DashyComponent },
  { path: 'dashboard',   component: DashboardComponent },
  { path: 'abos',        component: AbosComponent },
  { path: 'abos-inline', component: AbosInlineComponent },
  { path: 'abos-reactive', component: AbosReactiveComponent },
  { path: '**', redirectTo: '/'}
];
