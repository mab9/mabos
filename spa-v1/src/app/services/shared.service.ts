import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {MessagesService} from "./messages.service";

@Injectable({
  providedIn: "root" // one instance for the whole application
})
export class SharedService {

  constructor(
    private http: HttpClient,
    //private loading: LoadingService,
    private messages: MessagesService
  ) {
  }

  public handleError(message: string, err: Error): Observable<never> {
    console.error(message, err);
    this.messages.showMessages(message)
    return throwError(err);
  }
}
