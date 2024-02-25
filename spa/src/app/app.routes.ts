import {Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard/dashboard.component";
import {LandingComponent} from "./components/landing/landing.component";
import {AuthGuard} from "./guards/auth.guard";
import {AbosMainComponent} from "./components/abos/abos-main/abos-main.component";


export const routes: Routes = [
  { path: '',              redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'landing',       component: LandingComponent },  // not logged in user
  { path: 'dashboard',     component: DashboardComponent,    canActivate: [AuthGuard] },
  { path: 'abos',          component: AbosMainComponent,    canActivate: [AuthGuard] },
  //{ path: 'dashboard',              redirectTo: '/abos-fancy', pathMatch: 'full' },
  { path: '**',            redirectTo: '/dashboard'}
];
