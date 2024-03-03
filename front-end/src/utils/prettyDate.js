/**
 * Format a date in YYYY-MM-DD
 * @param date
 *  
 * @returns {*}
 *  a string date format as DayOfWeek Month DayNumber Year 
 */

function prettyDate(date){
  const dateFormat = new Date(`${date}T00:00`);
  const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfReservation = daysOfTheWeek[dateFormat.getDay()];
  const day = dateFormat.getDate();
  const monthsOfTheYear = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = monthsOfTheYear[dateFormat.getMonth()];
  const year = dateFormat.getFullYear();


  return `${dayOfReservation} ${month} ${day} ${year}`;
}

export default prettyDate;