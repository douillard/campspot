const fs = require('fs');
const moment = require('moment');


// This is necessary to ensure accurate sort
module.exports.compareNumbers = (a, b) => a - b;

// Converts a range of dates to an array of days
module.exports.getDaysOfYear = (startDate, endDate) => {
  
  // Using moment becuase it makes working with javascript 
  // dates a little more tolerable
  const start = moment(startDate)
  const end = moment(endDate)

  // Calculate the number of days between the 2 dates
  let diff = end.diff(start, 'days');

  // Convert start date to day of year
  let day = start.dayOfYear();

  // Create array of all days between and including 
  // startDate and endDate
  let days = [];
  for (let i = 0; i < diff + 1; i++) {
    days.push(day + i);
  }
  return days;
}

module.exports.isBooked = (a) => {
  // Compare current index value vs next index value
  for (let i = 0; i < a.length - 1; i++) {

    // They are the same: duplicate
    if (a[i + 1] === a[i]) return true;
  }

  // Not the same: not duplicate
  return false;
}

module.exports.hasGap = (r) => {

  for (let i = 0; i < r.length -1; i++) {

    // Calculate the difference between current index value
    // and next index value - 1 day.
    const diff = (r[i + 1] - r[i]) - 1;

    // contains single day gap
    if (diff === 1) return true;
  }

  // no single day gap
  return false;
}
