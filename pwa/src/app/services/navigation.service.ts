import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

export interface NaviData {

  pageTitle : string,
  showLogo : boolean,
  showReturnIcon : boolean,

}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private defaultPageNaviData : NaviData = { pageTitle : 'Mabos', showLogo : true, showReturnIcon : false}
  private currentPageNaviDataSubject = new BehaviorSubject<NaviData>(this.defaultPageNaviData);
  currentPageNaviData$ = this.currentPageNaviDataSubject.asObservable();

  constructor(private router: Router) {}

  setNaviDataDetailPage(pageTitle: string) {
    this.currentPageNaviDataSubject.next({ pageTitle : pageTitle, showLogo : false, showReturnIcon : true});
  }

  goHome() {
    this.router.navigate(['/abos']);
    this.currentPageNaviDataSubject.next(this.defaultPageNaviData);
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
