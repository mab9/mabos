import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, shareReplay, tap, throwError} from "rxjs";
import {Abo} from "../model/abos.model";
import {saveAbo} from "../../../server/abos.route";

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

  createItem(newItem: Abo) {
    const currentData = this.subject.value;
    const updatedData = [...currentData, newItem];
    this.subject.next(updatedData);
    this.postItem(newItem);
  }

  removeItem(item: Abo) {
    const updatedData = this.subject.value.filter(i => i !== item);
    this.subject.next(updatedData);
  }

  private postItem(abo: Abo) {
    this.http.post<{id: number}>('/api/abos', abo)
      .pipe(
        catchError(err => {
          return this.handleError("Could not create the abo", err);
        }),
        // @ts-ignore
        tap(savedItem => {
          const permanentId = savedItem.id; // Assuming the response contains the new ID
          const currentData = this.subject.value;
          const itemIndex = currentData.findIndex(item => item === abo);
          if (itemIndex !== -1) {
            const updatedItem = { ...currentData[itemIndex], id: permanentId };
            let updatedData = [...currentData];
            updatedData[itemIndex] = updatedItem;
            this.subject.next(updatedData); // Update the subject with the new data
          }
        })
      ).subscribe();
  }

  saveItem(itemId : number, changes : Partial<Abo>) : Observable<any> {
    // has a ref to the latest emitted value - to the current list.
    const items = this.subject.getValue();
    const index = items.findIndex(item => item.id == itemId);

    // create a new object with all new / changed values
    const newItem : Abo = {
      ...items[index], // apply current items
      ...changes // apply all our changes / override all our changes
    }

    const newItems : Abo[] = items.slice(0) // create complete copy of the array
    newItems[index] = newItem;
    this.subject.next(newItems); // reflect changes to subscribers

    // we do not show any loading indicator because changes are reflected instantly.
    return this.http.put(`/api/abos/${itemId}`, changes)
      .pipe(
        catchError(err => {
          return this.handleError("Could not save abo", err);
        }),
        shareReplay()
      );
  }

  private loadAll() {
    //const loadedCourses$ = this.http.get<Abo[]>('/api/abos')
    this.http.get<Abo[]>('/api/abos')
      .pipe(
        // @ts-ignore
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
