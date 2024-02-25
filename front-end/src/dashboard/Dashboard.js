import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import ReservationsList from "../components/ReservationsList";
import TablesList from "../components/TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {`${date}`}</h4>
      </div>
      <div>
        <button onClick={()=>history.push(`/dashboard?date=${previous(date)}`)}>previous</button>
        <button onClick={()=>history.push(`/dashboard?date=${today()}`)}>today</button>
        <button onClick={()=>history.push(`/dashboard?date=${next(date)}`)}>next</button>
      </div>
      <ErrorAlert errors={reservationsError} />
      <ReservationsList reservations={reservations}/>
    </main>
  );
}

export default Dashboard;
