import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "../components/forms/ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";
import validateReservationData from "../utils/validateReservationData";

function NewReservation(){

  const history = useHistory();
  const [apiError, setApiError] = useState([]);
  const [reservationFormErrors, setReservationFormErrors] = useState([]);

  async function handleSubmit(event, reservation){
    event.preventDefault();
    const abortController = new AbortController();
    const errors = validateReservationData(reservation);

    if(errors.length){
      return setReservationFormErrors(errors);
    }

    try{
      await createReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    }catch(error){
      setApiError([error]);
    }
    return () => abortController.abort();
  }
  
  return <>
        <h2> New Reservation</h2>
        <ErrorAlert errors={[...apiError, ...reservationFormErrors]}/>
        <ReservationForm handleSubmit={handleSubmit}/>
  </>;
}

export default NewReservation;