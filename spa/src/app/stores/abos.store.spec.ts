import {AbosStore} from "./abos.store";
import {TestBed} from "@angular/core/testing";
import {createAbo} from "../model/abos.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Period} from "../model/period.enum";
import {addMonths, isSameYearAndMonth} from "../util/date.util";



describe('AboStore', () => {

  let aboStore: AbosStore;

  const isExpiringThisMonth = (aboStartDateString : string, currentDateString : string, period = Period.MONTH) : boolean => {
    const currentDate = new Date(currentDateString)
    const aboStartDate = new Date(aboStartDateString)
    const abo = createAbo(aboStartDate, period);
    abo.active = true;
    abo.isAutoRenewal = true;
    return aboStore.isExpiringThisMonth(abo, currentDate);
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
    expect(isExpiringThisMonth("2024-01-20", "2024-01-15" )).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-01-25" )).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-02-15" )).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-02-19" )).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-02-20" )).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-02-25" )).toBeTrue();


    // boundaries
    expect(isExpiringThisMonth("2023-01-01", "2023-01-31" )).toBeTrue();
    expect(isExpiringThisMonth("2023-01-01", "2023-02-01" )).toBeFalse();


    // 3 Months Period
    expect(isExpiringThisMonth("2024-01-20", "2024-01-25", Period.QUARTER_YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-04-15", Period.QUARTER_YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-04-25", Period.QUARTER_YEAR)).toBeTrue();
    expect(isExpiringThisMonth("2024-01-20", "2024-07-15", Period.QUARTER_YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-07-25", Period.QUARTER_YEAR)).toBeTrue();

    // 6 Months Period
    expect(isExpiringThisMonth("2024-01-20", "2024-01-25", Period.HALF_YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-07-15", Period.HALF_YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2024-07-25", Period.HALF_YEAR)).toBeTrue();
    expect(isExpiringThisMonth("2024-01-20", "2025-01-15", Period.HALF_YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2025-01-25", Period.HALF_YEAR)).toBeTrue();

    // 6 Months Period
    expect(isExpiringThisMonth("2024-01-20", "2024-01-25", Period.YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2025-01-15", Period.YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2025-01-25", Period.YEAR)).toBeTrue();
    expect(isExpiringThisMonth("2024-01-20", "2026-01-15", Period.YEAR)).toBeFalse();
    expect(isExpiringThisMonth("2024-01-20", "2026-01-25", Period.YEAR)).toBeTrue();
  });

  it('should detect if an abo is expiring considering active inactive attribute', () => {
    let currentDate = new Date("2023-12-13")
    let aboStartDate = new Date("2023-11-12");
    let abo = createAbo(aboStartDate);

    abo.active = true;
    expect(aboStore.isExpiringThisMonth(abo, currentDate)).toBeTrue();

    abo.active = false;
    expect(aboStore.isExpiringThisMonth(abo, currentDate)).toBeFalse();
  });
});



