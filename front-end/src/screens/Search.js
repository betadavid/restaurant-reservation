import React, {useState} from "react";
import { listReservations } from "../utils/api";
import ReservationsList from "../components/ReservationsList";

function Search(){
  const [mobileNumber, setMobileNumber] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  async function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    try{
      const response = await listReservations({mobile_number: mobileNumber}, abortController.signal);
      setSearchResult(response);
      setSearchPerformed(true);
    }catch(error){
      throw error;
    }
    return () => abortController.abort();
  }

  function handleChange({target}){
    setMobileNumber(target.value);
  }

  return <div>
            <form onSubmit={(event)=>handleSubmit(event)} className="mt-3">
              <div className="form-group">
                <input
                  id="mobile_number"
                  name="mobile_number"
                  placeholder="Enter a mobile number"
                  required
                  onChange={handleChange}
                  value={mobileNumber}
                  className="form-control form-control-lg border-dark"/>
                <button type="submit" className="mt-3 btn btn-info btn-lg btn-block">Find</button>
              </div>
            </form>
            <ReservationsList reservations={searchResult}/>
            {searchPerformed && searchResult.length === 0? <h3>No reservations found</h3>:<></>}
         </div>
}

export default Search;