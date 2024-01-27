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

@Injectable({
  providedIn : "root" // one instance for the whole application

})
export class AbosStore implements OnDestroy {

  private changeSubjects = new Map<number, Subject<Abo>>();

  private subject = new BehaviorSubject<Abo[]>([])
  abos$ = this.subject.asObservable();
  abosCount$: Observable<number> = this.abos$.pipe(
    map(abos => abos.length)
  );
  abosActive$: Observable<number> = this.abos$.pipe(
    map(abos => abos.filter(abo => abo.active).length)
  );
  abosTotalMonthlyCosts$: Observable<number> = this.abos$.pipe(
    map(abos => abos.filter(abo => abo.active)),
    map(abos => abos.reduce((acc, abo) => acc + this.normalizePriceToPricePerMonth(abo), 0)),
    map(total => this.roundUpToNearestFiveCents(total))
  );

  abosTotalYearlyPrice$: Observable<number> = this.abos$.pipe(
    map(abos => abos.filter(abo => abo.active)),
    map(abos => abos.reduce((acc, abo) => acc + this.normalizePriceToPricePerYear(abo), 0)),
    map(total => this.roundUpToNearestFiveCents(total))
  );

  constructor(
    private http: HttpClient,
    //private loading: LoadingService,
    //private messages: MessagesService
  ) {
    this.loadAll();
  }

  normalizePriceToPricePerYear(abo: Abo) {
    return 12 * this.normalizePriceToPricePerMonth(abo);
  }

  normalizePriceToPricePerMonth(abo : Abo) {
      const divider = this.getPriceToMonthDivider(abo);
      return abo.price / divider;
  }

  roundUpToNearestFiveCents(amount: number): number {
    const multiplier = 20; // Since 1 / 0.05 = 20
    return Math.ceil(amount * multiplier) / multiplier;
  }

  getPriceToMonthDivider(abo: Abo) {
    switch (abo.period) {
      case Period.YEAR: return 12;
      case Period.QUARTER_YEAR: return 3;
      case Period.HALF_YEAR: return 6;
      default: return 1;
    }
  }

  createItem() {
    const newItem = this.newAbo();
    const currentData = this.subject.value;
    const updatedData = [...currentData, newItem];
    this.subject.next(updatedData);
    return this.postItem(newItem);
  }

  private newAbo() : Abo {
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    return {
      id: null,
      title: 'New Abo',
      price: 0,
      period : Period.MONTH,
      active: false,
      description: '',
      isEditing : false,
      startDate : formattedDate
    }
  }

  removeItem(itemId: number) {
    const newItems = this.subject.getValue().filter(item => item.id !== itemId);
    this.subject.next(newItems);
    return this.deleteItem(itemId);
  }

  private postItem(abo: Abo) {
    return this.http.post<{id: number}>('/api/abos', abo)
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
      )
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

  saveItemDebounce(itemId : number, changes : Partial<Abo>) {
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

    if (!this.changeSubjects.has(itemId)) {
      const subject = new Subject<Abo>();
      subject.pipe(
        debounceTime(2000)
      ).subscribe(latestItem => {
        this.http.put(`/api/abos/${itemId}`, latestItem)
          .pipe(
            catchError(err => {
              return this.handleError("Could not save abo", err);
            }),
            shareReplay()
          ).subscribe();
      });
      this.changeSubjects.set(itemId, subject);
    }

    // Push the latest item to the Subject
    this.changeSubjects.get(itemId)!.next(newItem);
  }

  ngOnDestroy() {
    this.changeSubjects.forEach(subject => subject.unsubscribe());
  }

  private deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`/api/abos/${itemId}`)
      .pipe(
        catchError(err => {
          return this.handleError("Could not delete abo", err);
        }),
        tap(() => {
          // Optionally perform additional actions on successful deletion
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
}
