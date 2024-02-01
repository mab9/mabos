import {TestBed} from "@angular/core/testing";
import {addMonths, isSameDay, isSameYearAndMonth} from "./date.util";


describe('DateUtil', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it("ensure date calculation correctness ", () => {
    const startDate = new Date("2023-02-28");
    const checkDate = new Date("2023-02-01")

    expect(isSameYearAndMonth(startDate, checkDate)).toBeTrue();
  })

  it("ensure date calculation correctness ", () => {
    const startDate = new Date("2023-12-28");
    const checkDate = new Date("2024-01-28")

    const toBeChecked = addMonths(startDate, 1);

    expect(isSameDay(toBeChecked, checkDate)).toBeTrue();
  })

  it("ensure date calculation correctness ", () => {
    // boundaries
    let startDate = new Date("2023-12-13");
    let checkDate = new Date("2024-01-13")

    expect(isSameYearAndMonth(startDate, checkDate)).toBeFalse();

    startDate = addMonths(startDate,1);
    expect(isSameDay(startDate,checkDate)).toBeTrue();
    expect(startDate === checkDate).toBeFalse(); // js reference comparison
    expect(isSameYearAndMonth(startDate, checkDate)).toBeTrue();

    startDate = addMonths(startDate,12);
    checkDate = addMonths(checkDate,12);
    expect(isSameDay(startDate, checkDate)).toBeTrue();
    expect(isSameYearAndMonth(startDate, checkDate)).toBeTrue();
  })

  it("do some date tests", () => {
    // boundaries
    let startDate = new Date("2023-12-13");
    let checkDate = new Date("2024-01-13");

    startDate = addMonths(startDate,1);
    expect(isSameYearAndMonth(startDate, checkDate)).toBeTrue();


    startDate = new Date("2023-10-13");
    checkDate = new Date("2023-11-13");

    expect(startDate.getMonth() == 9).toBeTrue()
    expect(checkDate.getMonth() == 10).toBeTrue()

    expect(startDate.getFullYear() == 2023).toBeTrue()
    expect(checkDate.getFullYear() == 2023).toBeTrue()

    startDate = addMonths(startDate, 1);
    checkDate = addMonths(checkDate, 1);

    expect(startDate.getMonth() == 10).toBeTrue()
    expect(checkDate.getMonth() == 11).toBeTrue()

    expect(startDate.getFullYear() == 2023).toBeTrue()
    expect(checkDate.getFullYear() == 2023).toBeTrue()

    startDate = addMonths(startDate, 1);
    checkDate = addMonths(checkDate, 1);

    // month overflow
    expect(startDate.getMonth() == 11).toBeTrue()
    expect(checkDate.getMonth() == 0).toBeTrue()

    // is considering the year
    expect(startDate.getFullYear() == 2023).toBeTrue()
    expect(checkDate.getFullYear() == 2024).toBeTrue()

    // boundaries
    startDate = new Date("2023-11-12");
    checkDate = new Date("2023-12-13");

    startDate = addMonths(startDate,1);

    expect(startDate < checkDate).toBeTrue()
    expect(isSameYearAndMonth(startDate, checkDate)).toBeTrue();
  })
});



