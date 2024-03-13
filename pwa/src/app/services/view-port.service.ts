import {Injectable} from "@angular/core";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";


@Injectable({
  providedIn: 'root'
})
export class ViewPortService {

  constructor(public breakPointObserver : BreakpointObserver) {
  }
  public isMobile() {
    return this.breakPointObserver.isMatched([Breakpoints.Small, Breakpoints.XSmall])
  }
}
