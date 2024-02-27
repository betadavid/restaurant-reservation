import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReservationForm from "../components/forms/ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { getReservationById, updateReservation } from "../utils/api";
import validateReservationData from "../utils/validateReservationData";

function EditReservation(){
  const { reservation_id } = useParams();
  const history = useHistory();
  const [apiError, setApiError] = useState([]);
  const [reservationFormErrors, setReservationFormErrors] = useState([]);
  const [reservation, setReservation] = useState(null);

  useEffect(()=>{
    const abortController = new AbortController();
    async function getReservation(){
      try{
        const response = await getReservationById(reservation_id, abortController.signal);
        setReservation(response);
      }catch(error){
        throw error;
      }
    };
    getReservation();

  },[reservation_id]);


  async function handleSubmit(event, updatedReservation){
    event.preventDefault();
    const abortController = new AbortController();
    const errors = validateReservationData(updatedReservation);

    if(errors.length){
      return setReservationFormErrors(errors);
    }

    try{
      await updateReservation(updatedReservation, reservation_id, abortController.signal);
      history.push(`/dashboard?date=${updatedReservation.reservation_date}`);
    }catch(error){
      setApiError([error]);
    }

    return () => abortController.abort();
  }
  return <>
        <h2> Edit Reservation</h2>
        <ErrorAlert errors={[...apiError, ...reservationFormErrors]}/>
        {reservation?<ReservationForm reservation={reservation} handleSubmit={handleSubmit}/>:<p>Loading reservation...</p>}
  </>;
}

export default EditReservation;