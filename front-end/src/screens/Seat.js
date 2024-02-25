import React, {useState, useEffect}from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";

function Seat(){
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(()=>{

    async function loadTables() {
      const abortController = new AbortController();
      try{
        const response = await listReservations(abortController.signal);
        setTables(response);
      }catch(error){
        throw new Error("error at loading tables SEAT component");
      }
      return () => abortController.abort();
    }

    loadTables();

    return;
  }, []);

  function changeHandler(event){
    setSelectedTable(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log("submitted");
    history.push("/");
  }

  return <form onSubmit={(event)=>handleSubmit(event)}>
            <select
              id="table_id"
              name="table_id"
              value={selectedTable}
              onChange={changeHandler}
              required
            >
              <option value="">- Select a table -</option>
              {tables.map(table => <option 
                                      value={table.table_id} 
                                      key={table.table_id}
                                      disabled={!table.reservation_id}
                                    >
                                      {table.table_name} - {table.table_capacity}
                                    </option> )}
            </select>
            <button type="submit">Submit</button>
         </form>
}

export default Seat;