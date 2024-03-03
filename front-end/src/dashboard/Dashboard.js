import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import ReservationsList from "../components/ReservationsList";
import TablesList from "../components/TablesList";
import prettyDate from "../utils/prettyDate";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]); 
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1 className="mb-4 pb-3" style={{borderBottom: "3px solid black"}}>Dashboard</h1>
      <ErrorAlert errors={reservationsError} />
      <div class="container">
        <div class="row">
          <div class="col-8">
            <div className="d-flex justify-content-around">
              <button onClick={()=>history.push(`/dashboard?date=${previous(date)}`)} className="btn btn-outline-dark">Previous</button>
              <button onClick={()=>history.push(`/dashboard?date=${today()}`)} className="btn btn-outline-dark">Today</button>
              <button onClick={()=>history.push(`/dashboard?date=${next(date)}`)} className="btn btn-outline-dark">Next</button>
            </div>
            <h2 className="mt-3">Reservations for <span style={{color:"#1E9ADF"}}>{prettyDate(date)}</span></h2>
            <ReservationsList reservations={reservations}/>
          </div>
          <div class="col-4" style={{borderLeft: "2px black solid"}}>
            <h2>Tables</h2>
            <TablesList tables={tables}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
