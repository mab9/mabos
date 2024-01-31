import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, shareReplay, throwError} from "rxjs";
import {Abo} from "../model/abos.model";
import {environment} from "../../environments/environment";
import {ApiConstants} from "../constants/api.constants";

@Injectable({
  providedIn: "root" // one instance for the whole application
})
export class AbosService {

  constructor(
    private http: HttpClient,
    //private loading: LoadingService,
    //private messages: MessagesService
  ) {
  }

  public getAll() {
    return this.http.get<Abo[]>(environment.backendUrl + ApiConstants.API_ABOS)
      .pipe(
        catchError(err => this.handleError("Could not load abos", err)),
        shareReplay()
      )
    //this.loading.showLoaderUntilCompleted(loadedCourses$).subscribe();
  }

  public post(abo: Abo) {
    return this.http.post<Abo>(environment.backendUrl + ApiConstants.API_ABOS, abo)
      .pipe(
        catchError(err => this.handleError("Could not create the abo", err)),
        shareReplay()
      )
  }

  public put(item: Abo) {
    return this.http.put(environment.backendUrl + ApiConstants.API_ABOS + `/${item.id}`, item)
      .pipe(
        catchError(err => this.handleError("Could not save abo", err)),
        shareReplay()
      );
  }

  public delete(itemId: number) {
    return this.http.delete(environment.backendUrl + ApiConstants.API_ABOS + `/${itemId}`)
      .pipe(
        catchError(err => this.handleError("Could not delete abo", err)),
        shareReplay()
      );
  }

  private handleError(message: string, err: Error): Observable<never> {
    // this.messages.showErrors(message);
    console.error(message, err);
    return throwError(err);
  }
}
