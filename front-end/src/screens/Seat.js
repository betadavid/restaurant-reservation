import React, {useState, useEffect}from "react";
import { useHistory } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Seat(){
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const { reservation_id } = useParams();

  useEffect(()=>{
    const abortController = new AbortController();
    async function loadTables() {
      try{
        const response = await listTables(abortController.signal);
        setTables(response);
      }catch(error){
        throw error;
      }
      return () => abortController.abort();
    }
    loadTables();
    return ()=>abortController.abort();
  }, []);

  function changeHandler(event){
    setSelectedTable(event.target.value);
  }

  const handleCancel = () => {
    history.goBack();
  }

  async function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    try{
      await updateTable(selectedTable, reservation_id, abortController.signal);
    }catch(error){
      throw error;
    }
    history.push("/");
    return ()=>abortController.abort();
  }

  return <form onSubmit={(event)=>handleSubmit(event)}>
          <fieldset>
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
                                      disabled={table.reservation_id}
                                    >
                                      {table.table_name} - {table.capacity}
                                    </option> )}
              </select>
              <button onClick={()=>handleCancel()} type="button">Cancel</button>
              <button type="submit">Submit</button>
            </fieldset>
         </form>
}

export default Seat;