import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: "root" // one instance for the whole application
})
export class SharedService {

  constructor(
    private http: HttpClient,
    //private loading: LoadingService,
    //private messages: MessagesService
  ) {
  }

  public handleError(message: string, err: Error): Observable<never> {
    // this.messages.showErrors(message);
    console.error(message, err);
    return throwError(err);
  }
}
