// date utility

const guardInstanceOfDate = date => {
    if (!(date instanceof Date)) {
        throw new TypeError("Object is not a valid date", date);
    }
}

const sameDay = function (date) {
    guardInstanceOfDate(date);

    const left = this;
    return left.getFullYear() === date.getFullYear() && left.getMonth() === date.getMonth() && left.getDate() === date.getDate();
};

const isBetween = function (from, to) {
    guardInstanceOfDate(from);
    guardInstanceOfDate(to);

    const between = this;
    return between.getFormatted() >= from.getFormatted() && between.getFormatted() <= to.getFormatted();
};

const countDaysBetween = function (right) {
    guardInstanceOfDate(right);
    const left = this;

    // The number of milliseconds in all UTC days (no DST).
    // UTC day always lasts 24 hours, unlike in other time formats, so it's safe do divide by 24 hours
    const oneDay = 1000 * 60 * 60 * 24;

    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC(left.getFullYear(), left.getMonth(), left.getDate());
    const end = Date.UTC(right.getFullYear(), right.getMonth(), right.getDate());

    // it's safe to divide by 24 hours
    return Math.abs((start - end) / oneDay);
}

const getFormatted = function () {
    const left = this;
    let year = '' + left.getFullYear();
    let month = '' + (left.getMonth() + 1);
    let day = '' + left.getDate();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}

Date.prototype.sameDay = sameDay;
Date.prototype.isBetween = isBetween;
Date.prototype.getFormatted = getFormatted;
Date.prototype.countDaysBetween = countDaysBetween;
