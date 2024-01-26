import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {Abo} from "../model/abos.model";

@Injectable({
  providedIn : "root" // one instance for the whole application

})
export class AbosStore {

  private subject = new BehaviorSubject<Abo[]>([])
  abos$ = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    //private loading: LoadingService,
    //private messages: MessagesService
  ) {
    this.loadAll();
  }

  addData(newItem: Abo) {
    const currentData = this.subject.value;
    const updatedData = [...currentData, newItem];
    this.subject.next(updatedData);
  }

  removeData(item: Abo) {
    const updatedData = this.subject.value.filter(i => i !== item);
    this.subject.next(updatedData);
  }

  private loadAll() {
    //const loadedCourses$ = this.http.get<Abo[]>('/api/abos')
    this.http.get<Abo[]>('/api/abos')
      .pipe(
        // @ts-ignore
        map(response => response['payload']),
        catchError(err => {
          return this.handleError("Could not load abos", err);
        }),
        /// if no error occurs we receive the abos
        tap(abos => this.subject.next(abos))
      ).subscribe()

    //this.loading.showLoaderUntilCompleted(loadedCourses$).subscribe();
  }

  private handleError(message : string, err : Error) : Observable<never> {
    // this.messages.showErrors(message);
    console.error(message,err);
    return throwError(err);
  }

  getTotalCostOfAbos() {
    return this.subject.getValue().map(t => t.price).reduce((acc, value) => Number(acc) + Number(value), 0);
  }

  getTotalActiveAbos() {
    return this.subject.getValue().filter(t => t.active).length;

  }


}
