import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, debounceTime, map, Observable, Subject, tap} from "rxjs";
import {Abo} from "../model/abos.model";
import {Period} from "../model/period.enum";
import {format} from "date-fns";
import {AbosService} from "../services/abos.service";

@Injectable({
  providedIn: "root" // one instance for the whole application
})
export class AbosStore implements OnDestroy {

  private today = new Date();
  private changeSubjects = new Map<number, Subject<Abo>>();
  private subject = new BehaviorSubject<Abo[]>([])
  abos$ = this.subject.asObservable().pipe(
    map(abos => abos.map(abo => ({ ...abo, isExpiringThisMonth: this.isExpiringThisMonth(abo, this.today) })))
  );


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

  abosTotalExpiringThisMonth$ : Observable<number> = this.abos$.pipe(
    map(abos => abos.filter(abo => abo.isExpiringThisMonth).length)
  );

  constructor(
    private abosService : AbosService,
  ) {
    // inital load
    this.abosService.getAll().subscribe(items => this.subject.next(items));
  }


  isExpiringThisMonth(abo: Abo, currentDay : Date) {
    if (!abo.active) {
      return false;
    }

    const periodInMonths = this.getPeriodInMonth(abo);
    let start = new Date(abo.startDate);
    const end = new Date(start);

    while (start < currentDay) {
      end.setMonth(start.getMonth() + periodInMonths);
      if (abo.isAutoRenewal) {
        start = new Date(end);
      } else {
        break;
      }
    }

    return end.getMonth() === this.today.getMonth() && end.getFullYear() === this.today.getFullYear();
  }

  normalizePriceToPricePerYear(abo: Abo) {
    return 12 * this.normalizePriceToPricePerMonth(abo);
  }

  normalizePriceToPricePerMonth(abo: Abo) {
    const divider = this.getPeriodInMonth(abo);
    return abo.price / divider;
  }

  roundUpToNearestFiveCents(amount: number): number {
    const multiplier = 20; // Since 1 / 0.05 = 20
    return Math.ceil(amount * multiplier) / multiplier;
  }

  getPeriodInMonth(abo: Abo) {
    switch (abo.period) {
      case Period.YEAR:
        return 12;
      case Period.QUARTER_YEAR:
        return 3;
      case Period.HALF_YEAR:
        return 6;
      default:
        return 1;
    }
  }

  createItem() {
    const newItem = this.newAbo();
    const currentData = this.subject.value;
    const updatedData = [...currentData, newItem];
    this.subject.next(updatedData);
    this.abosService.post(newItem).pipe(
      tap(savedItem => {
        const permanentId = savedItem.id; // Assuming the response contains the new ID
        const currentData = this.subject.value;
        const itemIndex = currentData.findIndex(item => item === newItem);
        if (itemIndex !== -1) {
          const updatedItem = {...currentData[itemIndex], id: permanentId};
          let updatedData = [...currentData];
          updatedData[itemIndex] = updatedItem;
          this.subject.next(updatedData); // Update the subject with the new data
        }
      }
    )).subscribe();
  }

  private newAbo(): Abo {
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    return {
      id: null,
      title: 'New Abo',
      price: 0,
      period: Period.MONTH,
      active: false,
      description: '',
      isEditing: false,
      isExpiringThisMonth: false,
      isAutoRenewal: false,
      startDate: formattedDate
    }
  }

  removeItem(itemId: number) {
    const newItems = this.subject.getValue().filter(item => item.id !== itemId);
    this.subject.next(newItems);
    this.abosService.delete(itemId).subscribe();
  }

  saveItem(itemId: number, changes: Partial<Abo>) {
    // we do not show any loading indicator because changes are reflected instantly.
    const newItem = this.reflectChanges(itemId, changes);
    this.abosService.put(newItem).subscribe();
  }


  private reflectChanges(itemId: number, changes: Partial<Abo>) : Abo {
    // has a ref to the latest emitted value - to the current list.
    const items = this.subject.getValue();
    const index = items.findIndex(item => item.id == itemId);

    // create a new object with all new / changed values
    const newItem: Abo = {
      ...items[index], // apply current items
      ...changes // apply all our changes / override all our changes
    }

    const newItems: Abo[] = items.slice(0) // create complete copy of the array
    newItems[index] = newItem;
    this.subject.next(newItems); // reflect changes to subscribers
    return newItem;
  }


  saveItemDebounce(itemId: number, changes: Partial<Abo>) {
    const newItem = this.reflectChanges(itemId, changes);
    if (!this.changeSubjects.has(itemId)) {
      const subject = new Subject<Abo>();
      subject.pipe(
        debounceTime(1000)
      ).subscribe(latestItem => {
        this.abosService.put(latestItem).subscribe();
      });
      this.changeSubjects.set(itemId, subject);
    }

    // Push the latest item to the Subject
    this.changeSubjects.get(itemId)!.next(newItem);
  }

  ngOnDestroy() {
    this.changeSubjects.forEach(subject => subject.unsubscribe());
  }
}






