import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, debounceTime, Subject} from "rxjs";
import {AuthStore} from "./auth.store";
import {FeatureFlag} from "../model/feature-flag.model";
import {FeatureFlagsService} from "../services/feature-flags.service";
import {FeatureFlagEnum} from "../model/feature-flag.enum";

@Injectable({
  providedIn: "root" // one instance for the whole application
})
export class FeatureFlagsStore implements OnDestroy {

  private changeSubjects = new Map<number, Subject<FeatureFlag>>();
  private subject = new BehaviorSubject<FeatureFlag[]>([])
  featureFlags$ = this.subject.asObservable();

  constructor(
    private authStore: AuthStore,
    private featureFlagService: FeatureFlagsService,
  ) {
    // initial load
    this.authStore.isLoggedIn$.subscribe(isLoggeIn => {
        // This approach would leak information after logout ouf the user. The user data would still be available.
        if (isLoggeIn) {
          // memory leak on destroy ;-)
          this.featureFlagService.getAll().subscribe(items => this.subject.next(items));
        }
    })
  }
  isActive(feature : string) : boolean {
    return !!this.subject.getValue().find(item => item.feature === feature)?.flag;
  }

  isNavActive(): boolean {
    return this.isActive(FeatureFlagEnum.NAV);
  }

  /*
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
   */

  save(featureFlag : FeatureFlag) {
    this.featureFlagService.put(featureFlag).subscribe();
    if (!this.changeSubjects.has(featureFlag.id)) {
      const subject = new Subject<FeatureFlag>();
      subject.pipe(
        debounceTime(1000)
      ).subscribe(latestItem => {
        this.featureFlagService.put(latestItem).subscribe();
      });
      this.changeSubjects.set(featureFlag.id, subject);
    }
    this.changeSubjects.get(featureFlag.id)!.next(featureFlag);
  }

  ngOnDestroy() {
    this.changeSubjects.forEach(subject => subject.unsubscribe());
  }
}






