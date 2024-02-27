import React from "react";
import { Link, useHistory } from "react-router-dom";
import { cancelReservation } from "../utils/api";

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

  const history = useHistory();

  async function handleCancel(){
    const abortController = new AbortController();
    const response = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
    if(response){
      try{
        await cancelReservation(reservation_id,abortController.signal);
        history.go(0);
      }catch(error){
        throw error;
      }
    }
    return ()=>abortController.abort();
  }

  return <div>
            <h2>{`${first_name} ${last_name}`}</h2>
            <p>Mobile: {mobile_number}</p>
            <p>date: {`${reservation_date} at ${reservation_time}`}</p>
            <p>party of: {people}</p>
            <p data-reservation-id-status={reservation_id}>{status}</p>
            {status==="booked"?<Link to={`/reservations/${reservation_id}/seat`}>Seat</Link>:<></>}
            <Link to={`/reservations/${reservation_id}/edit`}>Edit</Link>
            <button 
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={handleCancel}
            >
              Cancel
            </button>
         </div>;
}

export default Reservation;