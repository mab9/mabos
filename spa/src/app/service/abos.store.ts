import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, tap} from "rxjs";
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

  private loadAll() {
    console.info("load abos")
    const loadedCourses$ = this.http.get<Abo[]>('/api/abos')
      .pipe(
        // @ts-ignore
        map(response => response['payload']),
        /// if no error occurs we receive the abos
        tap(courses => this.subject.next(courses))
      )

    //this.loading.showLoaderUntilCompleted(loadedCourses$).subscribe();
  }


}
