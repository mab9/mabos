import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiConstants} from "../constants/api.constants";
import {catchError, shareReplay} from "rxjs";
import {SharedService} from "./shared.service";
import {User} from "../model/user.model";

@Injectable({
  providedIn: "root" // one instance for the whole application
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private sharedService : SharedService
    //private loading: LoadingService,
    //private messages: MessagesService
  ) {
  }

  public getMe() {
    return this.http.get<User>(environment.backendUrl + ApiConstants.API_USERS + "/me")
      .pipe(
        catchError(err => this.sharedService.handleError("Could not load user me", err)),
        shareReplay()
      )
    //this.loading.showLoaderUntilCompleted(loadedCourses$).subscribe();
  }

  public put(item: User) {
    return this.http.put(environment.backendUrl + ApiConstants.API_USERS + `/${item.id}`, item)
      .pipe(
        catchError(err => this.sharedService.handleError("Could not update user me", err)),
        shareReplay()
      );
  }
}
