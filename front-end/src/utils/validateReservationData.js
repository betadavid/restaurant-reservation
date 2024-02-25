export default function validateReservationData(reservation){
  const {reservation_date, reservation_time} = reservation;
  const errors = [];
  const tuesday = 2;
  const date = new Date(`${reservation_date}T${reservation_time}`);
  const dayOfReservation = date.getDay();
  const hours = date.getHours();
  const mins = date.getMinutes();

  if(dayOfReservation === tuesday){
    errors.push(new Error("Reservation must be a different day, restaurant is closed on Tuesdays"));
  }

  if(Date.parse(date) <= Date.now()){
    errors.push(new Error("Reservation must be in the future"));
  }

  
  if(hours < 10 || (hours === 10 && mins < 30)){
    errors.push(new Error("Reservation must be after 10:30 AM"));
  }
  if(hours > 21 || (hours === 21 && mins > 30)){
    errors.push(new Error("Reservation must be before 9:30 PM"));
  }

  return errors;
};
