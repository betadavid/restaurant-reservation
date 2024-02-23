import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "../forms/ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

function NewReservation(){

  const history = useHistory();
  const [apiError, setApiError] = useState(null);

  async function handleSubmit(event, reservation){
    event.preventDefault();
    console.log("reservation at handleSubmit", reservation);
    try{
      const response = await createReservation(reservation);
      if(response.error) {
        setApiError(new Error(response.error));
      }else{
        setApiError(null);
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      }
    }catch(err){
      throw new Error("something went wrong when creating the reservation!");
    }
    
  }

  return <>
        <h2> New Reservation</h2>
        {apiError? <ErrorAlert error={apiError}/>:<></> }
        <ReservationForm handleSubmit={handleSubmit}/>
  </>;
}

export default NewReservation;