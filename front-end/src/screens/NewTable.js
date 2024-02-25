import React from "react";
import TableForm from "../components/forms/TableForm";

function NewTable(){

  async function handleSubmit(event, reservation){
    event.preventDefault();
    const abortController = new AbortController();
    /*
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
    */
   console.log("submitted");
   return ()=>abortController.abort();
  }

  return <>
            <h2>New Table</h2>
            <TableForm handleSubmit={handleSubmit}/>
         </>;
}

export default NewTable;