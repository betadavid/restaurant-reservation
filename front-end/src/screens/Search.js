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
            <form onSubmit={(event)=>handleSubmit(event)}>
              <input
                id="mobile_number"
                name="mobile_number"
                placeholder="Enter a mobile number"
                required
                onChange={handleChange}
                value={mobileNumber}
              />
              <button type="submit">Find</button>
            </form>
            <ReservationsList reservations={searchResult}/>
            {searchPerformed && searchResult.length === 0? <h3>No reservations found</h3>:<></>}
         </div>
}

export default Search;