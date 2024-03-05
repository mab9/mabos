import {Routes} from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {AuthGuard} from "./guards/auth.guard";
import {AbosMainComponent} from "./components/abos/abos-main/abos-main.component";
import {ProfileComponent} from "./components/profile/profile.component";


export const routes: Routes = [
  { path: '',              redirectTo: '/abos', pathMatch: 'full' },
  { path: 'landing',       component: LandingComponent },  // not logged in user
  { path: 'abos',          component: AbosMainComponent,    canActivate: [AuthGuard] },
  { path: 'profile',       component: ProfileComponent,    canActivate: [AuthGuard] },
  { path: '**',            redirectTo: '/abos'}
];
