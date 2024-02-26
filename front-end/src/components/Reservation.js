import React from "react";
import { Link } from "react-router-dom";

function Reservation({reservation}){
  const {reservation_id,
         first_name, 
         last_name, 
         mobile_number,
         reservation_date,
         reservation_time,
         people,
         status
        } = reservation;

  return <div>
            <h2>{`${first_name} ${last_name}`}</h2>
            <p>Mobile: {mobile_number}</p>
            <p>date: {`${reservation_date} at ${reservation_time}`}</p>
            <p>party of: {people}</p>
            <p data-reservation-id-status={reservation_id}>{status}</p>
            {status==="booked"?<Link to={`/reservations/${reservation_id}/seat`}>Seat</Link>:<></>}
         </div>;
}

export default Reservation;