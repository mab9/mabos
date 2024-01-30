import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  tap,
  throwError
} from "rxjs";
import {Abo} from "../model/abos.model";
import {Period} from "../model/period.enum";
import {format} from "date-fns";
import {environment} from "../../environments/environment";
import {AppConstants} from "../constants/app.constants";

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
    //const loadedCourses$ = this.http.get<Abo[]>('/api/abos')
    return this.http.get<Abo[]>(environment.rooturl + AppConstants.API_ABOS)
      .pipe(
        catchError(err => this.handleError("Could not load abos", err)),
        shareReplay()
      )
    //this.loading.showLoaderUntilCompleted(loadedCourses$).subscribe();
  }

  public post(abo: Abo) {
    return this.http.post<{ id: number }>('/api/abos', abo)
      .pipe(
        catchError(err => {
          return this.handleError("Could not create the abo", err);
        })
      )
  }

  public put(itemId: number, item: Abo) {
    return this.http.put(environment.rooturl + AppConstants.API_ABOS + `/${itemId}`, item)
      .pipe(
        catchError(err => this.handleError("Could not save abo", err)),
        shareReplay()
      );
  }

  public delete(itemId: number) {
    return this.http.delete(environment.rooturl + AppConstants.API_ABOS + `/${itemId}`)
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
