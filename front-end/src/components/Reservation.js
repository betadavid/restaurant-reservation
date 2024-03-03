import React from "react";
import { Link, useHistory } from "react-router-dom";
import { cancelReservation } from "../utils/api";
import prettyTime from "../utils/prettyTime";

function Reservation({reservation}){
  const {reservation_id,
         first_name, 
         last_name, 
         mobile_number,
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

  return <div className="container">
          <div className="row">
            <div className="col col-lg-2" style={{borderRight: "1px solid lightGrey"}}>
              <h3>{prettyTime(reservation_time)}</h3>
              <p data-reservation-id-status={reservation_id}>{status}</p>
            </div>
            <div className="col">
              <h4>{`${first_name} ${last_name}`}</h4>
              <p>Mobile: {mobile_number}</p>
            </div>
            <div className="col">
              <h3>Party of: {people}</h3>
              <div className="d-flex justify-content-start">
                {status==="booked"?<Link to={`/reservations/${reservation_id}/seat`} className="mr-2 btn btn-success">Seat</Link>:<></>}
                <Link to={`/reservations/${reservation_id}/edit`} className="mr-2 btn btn-warning">Edit</Link>
                <button 
                  data-reservation-id-cancel={reservation.reservation_id}
                  onClick={handleCancel}
                  className="btn btn-danger mr-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
         </div>;
}

export default Reservation;