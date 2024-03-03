/**
 * Format a date in HH:MM Military format
 * @param time
 *  
 * @returns {*}
 *  a string time in HH:MM AM/PM
 */

function prettyTime(time){
  time = time.split(":");
  let hours = Number(time[0]);
  const mins = time[1];
  let ampm = "AM";

  if(hours>12){
    hours = hours - 12;
    ampm = "PM";
  }

  return `${hours}:${mins} ${ampm}`;
}

export default prettyTime;