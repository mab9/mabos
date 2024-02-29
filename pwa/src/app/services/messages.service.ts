import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {filter} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: "root" // one instance for the whole application
})
export class MessagesService {

  /*
    How do you handle errors and messages?
    When considering to react on a user action (button was clicked),
    a snackbar subscription object must be returned.

    To show messages without reactions on user input, a snackbar can be raised...
    Here errors and messages are mixed. This service is used to raise ideas, what one could design.
   */


  // added advantage remember last value emitted by the subject and make it immediately available to new subscribes.
  private subject = new BehaviorSubject<string[]>([]);
  errors$ = this.subject.asObservable().pipe(
    // filter empty array (default value) that is not an error message.
    filter(messages => messages && messages.length > 0)
  );

  constructor(private _snackBar: MatSnackBar) {
    this.errors$.subscribe(erros => {

      const snackBarSubscription = this.openSnackBar(erros[0]);
      snackBarSubscription.onAction().subscribe(() => console.log('The snackbar action was triggered!'));
    })
  }

  showErrors(...errors: string[]) {
      this.subject.next(errors);
  }

  showMessages(message : string) {
    return this.openSnackBar(message);
  }

  openSnackBar(message : string, snackBarOpenDurationInSeconds = 3) {
    return this._snackBar.open(message, "close me",
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: snackBarOpenDurationInSeconds * 1000,
      });
  }
}
