const { getDaysOfYear, compareNumbers, isBooked, hasGap } = require('./util');

const data = {
  "search": { "startDate": "2018-06-04", "endDate": "2018-06-06"
  },
  "campsites": [
    { "id": 1, "name": "Cozy Cabin" },
    { "id": 2, "name": "Comfy Cabin" },
    { "id": 3, "name": "Rustic Cabin" },
    { "id": 4, "name": "Rickety Cabin" },
    { "id": 5, "name": "Cabin in the Woods" }
  ],
  "reservations": [
    {"campsiteId": 1, "startDate": "2018-06-01", "endDate": "2018-06-04"},
    {"campsiteId": 1, "startDate": "2018-06-08", "endDate": "2018-06-10"},

    {"campsiteId": 2, "startDate": "2018-06-01", "endDate": "2018-06-01"},
    {"campsiteId": 2, "startDate": "2018-06-02", "endDate": "2018-06-03"},
    {"campsiteId": 2, "startDate": "2018-06-07", "endDate": "2018-06-09"},
    {"campsiteId": 3, "startDate": "2018-06-01", "endDate": "2018-06-02"},
    {"campsiteId": 3, "startDate": "2018-06-08", "endDate": "2018-06-09"},
    {"campsiteId": 4, "startDate": "2018-06-07", "endDate": "2018-06-10"}
  ]
};

const combineReservedDays = (reservations) => {

  const reserved = [];

  reservations.forEach(r => {

    // Same helper function used for search dates
    const daysArray = getDaysOfYear(r.startDate, r.endDate);

    // Combine dates from multiple reservation objects
    reserved.push(...daysArray);
  })

  // return array of combined reserved days
  return reserved;
}

const addReservationsToSites = (campsites, reservations) => {

  // returns an array of campsites updated to include reservations
  return campsites.map(site => {

    // Filter reservations by campsite id
    const reservedDays = reservations.filter(r => r.campsiteId === site.id);

    // Map reservations to campsite
    site['reserved'] = combineReservedDays(reservedDays);

    // return campsite object with added reservations
    return site;
  });
}

const getAvailable = (sites, searchDaysArray) => {
  let results = [];

  sites.forEach(site => {

    // Combine both search days and reserved days into a single array
    // Sort by days ascending
    const days = [...searchDaysArray, ...site.reserved].sort(compareNumbers);

    // Check for any duplicates in the array.
    // Returns true or false
    // true indicates a search day overlaps a reserved day.
    const booked = isBooked(days);

    // Calculate the difference (gap) between values in the array.
    // Returns: true or false
    // true indicates a one day difference (gap) exists
    const gap = hasGap(days);

    // There are no duplicates and no single day gaps
    if (!booked && !gap) results.push(site.name);
  });
  return results;
}

const checkDates = () => {

  // destructure data
  const { campsites, reservations, search } = data;

  // Helper function to create array of search dates converted to "day number within year"
  // Example Output: [152, 153, 154]
  // TODO: Add logic to account for year
  const searchDaysArray = getDaysOfYear(search.startDate, search.endDate);

  // Create an array of campsites including reservations arrays
  const sitesArray = addReservationsToSites(campsites, reservations);

  // Check search dates against reserved dates
  let results = getAvailable(sitesArray, searchDaysArray);

  results = results.join("\n");

  console.log(results);

  return results;
}

checkDates();
