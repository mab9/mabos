import {addMonths as addMonthsDateFns} from 'date-fns';

export const isSameYearAndMonth =  (left : Date, right : Date) => {
  return left && right && left.getMonth() === right.getMonth() && left.getFullYear() == right.getFullYear();
}

export const addMonths = (date : Date, months : number) : Date => {
  //return moment(date).add({ months: months }).toDate(); // use moment js to avoid to handle boundary issues with plain JS
  return addMonthsDateFns(date, months); // use moment js to avoid to handle boundary issues with plain JS
}

export const isSameDay =  (left : Date, right : Date) => {
  return left && right && left.getMonth() == right.getMonth() && left.getFullYear() == right.getFullYear() && left.getDay() == right.getDay();
}
