import {AbosStore} from "./abos.store";
import {TestBed} from "@angular/core/testing";
import {createAbo} from "../model/abos.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Period} from "../model/period.enum";

describe('AboStore', () => {

  let aboStore: AbosStore;

  const isExpiringThisMonth = (aboStartDate : string, currentDate : string, period = Period.MONTH) : boolean => {
    const currentDay = new Date(aboStartDate)
    const abo = createAbo(new Date(currentDate));
    abo.active = true;
    abo.period = period;
    return aboStore.isExpiringThisMonth(abo, currentDay);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AbosStore]
    });
    aboStore = TestBed.inject(AbosStore);
  });

  it('should be created', () => {
    expect(aboStore).toBeTruthy();
  });

  it('should detect if an abo is expiring this month', () => {

    // 1 Months Period
    expect(isExpiringThisMonth("2023-12-14", "2024-01-16", )).toBeTrue();
    expect(isExpiringThisMonth("2023-12-14", "2024-01-15", )).toBeTrue();
    expect(isExpiringThisMonth("2023-12-14", "2024-01-14", )).toBeFalse();
    expect(isExpiringThisMonth("2023-12-14", "2024-01-13", )).toBeFalse();

    expect(isExpiringThisMonth("2024-01-20", "2024-01-15", )).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-01-25", )).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-02-14", )).toBeTrue();
    expect(isExpiringThisMonth("2024-01-20", "2024-02-25", )).toBeFalse();

    // 3 Months Period
    expect(isExpiringThisMonth("2024-01-20", "2024-04-15", Period.QUARTER_YEAR)).toBeTrue();
    expect(isExpiringThisMonth("2024-01-20", "2024-04-25", Period.QUARTER_YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-07-14", Period.QUARTER_YEAR)).toBeTrue();
    expect(isExpiringThisMonth("2024-01-20", "2024-07-25", Period.QUARTER_YEAR)).toBeFalse();
  });
});



