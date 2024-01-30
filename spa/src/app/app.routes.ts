import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {AbosComponent} from "./components/abos/abos.component";
import {AbosInlineComponent} from "./components/abos-inline/abos-inline.component";
import {DASH} from "@angular/cdk/keycodes";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AbosReactiveComponent} from "./components/abos-reactive/abos-reactive.component";
import {DashyComponent} from "./components/dashy/dashy.component";

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
