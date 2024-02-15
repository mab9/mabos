import "./dates.js"
import {Suite} from "../../test/test.js"

const util = Suite("util-dates");

util.add("equals", assert => {

    const day = new Date(2019, 5, 6);
    assert.true(day.sameDay(day))

    const tomorrow = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    assert.true(!tomorrow.sameDay(day));

    const yesterday = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
    assert.true(!yesterday.sameDay(day));
});

util.add("guard check", assert => {

    const day = new Date(2019, 5, 6);

    try {
        day.sameDay("null");
        assert.true(0) // should never arrive to this code!
    } catch (exception) {
        assert.true(exception);
    }

    try {
        day.isBetween("null", new Date());
        assert.true(0) // should never arrive to this code!
    } catch (exception) {
        assert.true(exception);
    }

    try {
        day.isBetween(new Date(), false);
        assert.true(0) // should never arrive to this code!
    } catch (exception) {
        assert.true(exception);
    }
});

util.add("isBetween", assert => {

    const day = new Date(2019, 5, 6);
    const tomorrow = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    const yesterday = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
    const nextWeek = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 7);

    assert.true(day.isBetween(day, day));
    assert.true(day.isBetween(day, tomorrow));
    assert.true(day.isBetween(yesterday, day));
    assert.true(day.isBetween(yesterday, nextWeek));
    assert.true(!yesterday.isBetween(day, nextWeek));
    assert.true(!nextWeek.isBetween(day, yesterday));
});

util.add("count days between", assert => {

    const day = new Date(2019, 5, 6);
    const yesterday = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
    const nextWeek = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 7);
    const lastYear = new Date(day.getFullYear() - 1, day.getMonth(), day.getDate());

    assert.is(day.countDaysBetween(day), 0)
    assert.is(day.countDaysBetween(yesterday), 1)
    assert.is(day.countDaysBetween(nextWeek), 7)
    assert.is(lastYear.countDaysBetween(day), 365)
    assert.is(day.countDaysBetween(lastYear), 365)
})

util.run();
