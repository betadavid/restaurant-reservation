import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({reservation = {first_name:"" ,
    last_name:"",
    mobile_number:"",
    reservation_date:"",
    reservation_time:"",
    people: 0,
    status: "booked"
  }, handleSubmit}){

  const history = useHistory();

  const initialFormState = {first_name: reservation.first_name,
    last_name: reservation.last_name,
    mobile_number: reservation.mobile_number,
    reservation_date: reservation.reservation_date,
    reservation_time: reservation.reservation_time,
    people: reservation.people,
    status: reservation.status
  };

  const [formData, setFormData] = useState({...initialFormState});

  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    });
  };

  const handleCancel = () => {
    history.goBack();
  }

  return <form onSubmit={(event)=> handleSubmit(event, formData)}> 
            <label htmlFor="first_name">First Name:</label>
            <input
              id="first_name" 
              name="first_name"
              type="text"
              placeholder="First Name" 
              onChange={handleChange}
              value={formData.first_name}
              required
            />
            <label htmlFor="last_name">Last Name:</label>
            <input 
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.last_name}
              required
            />
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="text"
              placeholder="mobile number"
              onChange={handleChange}
              value={formData.mobile_number}
              required
              //required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
            <label htmlFor="reservation_date">Reservation Date:</label>
            <input
              id="reservation_date"
              name="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              required pattern="\d{4}-\d{2}-\d{2}"
              onChange={handleChange}
              value={formData.reservation_date}
            />
            <label htmlFor="reservation_time">Time:</label>
            <input
              id="reservation_time"
              name="reservation_time"
              type="time"
              placeholder="HH:MM"
              required pattern="[0-9]{2}:[0-9]{2}"
              onChange={handleChange}
              value={formData.reservation_time}
            />
            <label htmlFor="people">Party size: </label>
            <input
              id="people"
              name="people"
              type="number"
              min="1"
              onChange={handleChange}
              value={formData.people}
              required
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={()=>handleCancel()}>Cancel</button>
          </form >;
}

export default ReservationForm;