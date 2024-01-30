import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, shareReplay, tap, throwError} from "rxjs";
import {Setting} from "../model/settings.model";
import {HttpClient} from "@angular/common/http";
import {Abo} from "../model/abos.model";

@Injectable({
  providedIn : "root" // one instance for the whole application

})
export class SettingsStore {

  private emptySetting: Setting = {
    email : '',
    isReminderEmailActivated : false,
  };

  private subject = new BehaviorSubject<Setting>(this.emptySetting)
  settings$ = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    //private loading: LoadingService,
    //private messages: MessagesService
  ) {
    this.loadSetting('mab@mab.rocks');
  }

  private loadSetting(email : string) {
    this.http.get<Setting>('/api/settings/' + email)
      .pipe(
        // @ts-ignore
        catchError(err => {
          return this.handleError("Could not load settings", err);
        }),
        /// if no error occurs we receive the abos
        tap(abos => this.subject.next(abos))
      ).subscribe()
  }

  saveItem(email : string, changes : Setting) : Observable<any> {
    this.subject.next(changes); // reflect changes to subscribers

    // we do not show any loading indicator because changes are reflected instantly.
    return this.http.put(`/api/settings/` + email, changes)
      .pipe(
        catchError(err => {
          return this.handleError("Could not save settings", err);
        }),
        shareReplay()
      );
  }


  private handleError(message : string, err : Error) : Observable<never> {
    // this.messages.showErrors(message);
    console.error(message,err);
    return throwError(err);
  }
}
