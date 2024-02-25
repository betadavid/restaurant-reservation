import React from "react";
import Reservation from "./Reservation";

function ReservationsList({reservations}){

  return <ul className="list-group list-group-flush">
            {reservations.map(reservation => <li key={reservation.reservation_id} className="list-group-item"><Reservation reservation={reservation}/></li>)}
         </ul>;
}

export default ReservationsList;