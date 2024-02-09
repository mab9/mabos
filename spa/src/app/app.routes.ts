import {Routes} from '@angular/router';
import {AbosComponent} from "./components/abos/abos.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AbosReactiveComponent} from "./components/abos-reactive/abos-reactive.component";
import {LandingComponent} from "./components/landing/landing.component";
import {AuthGuard} from "./guards/auth.guard";
import {AbosMainDetailComponent} from "./components/abos-main-detail/abos-main-detail.component";

export const routes: Routes = [
  { path: '',              redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'landing',       component: LandingComponent },  // not logged in user
//  { path: 'dashboard',     component: DashboardComponent,    canActivate: [AuthGuard] },
  { path: 'dashboard',              redirectTo: '/abos-fancy', pathMatch: 'full' },
  { path: 'abos',          component: AbosComponent,         canActivate: [AuthGuard] },
  { path: 'abos-fancy',    component: AbosMainDetailComponent,   canActivate: [AuthGuard] },
  { path: 'abos-reactive', component: AbosReactiveComponent, canActivate: [AuthGuard] },
  { path: '**',            redirectTo: '/dashboard'}
];
