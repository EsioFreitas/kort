import { padTo2Digits } from "./number";

export const formatDate = (date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

export const lastDays = (actualDate, days) => {
  let results = [];
  for (let i = 0; i < days; i++) {
    let d = new Date(actualDate.getTime())
    d.setDate(d.getDate() - i);
    results.push(formatDate(d))
  }
  return results;
}
