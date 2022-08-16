const addLeadingZero = (num, places) => String(num).padStart(places, '0');

const padTo2Digits = (num) => num.toString().padStart(2, "0");

export { addLeadingZero, padTo2Digits };
