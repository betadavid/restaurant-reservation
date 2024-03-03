import React from "react";
import { useHistory } from "react-router-dom";
import { finishTable } from "../utils/api";

function Table({table}){
  const history = useHistory();

  async function finishHandler(){
    const abortController = new AbortController();

    try{
      const result = window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      );
      if(result){
        await finishTable(table.table_id, abortController.signal);
        history.push("/");
      }
    }catch(error){
      throw error;
    }

    return ()=>abortController.abort();
  }

  return <div className="container">
            <h2>Table {table.table_name}</h2>
            <p>Capacity: {table.capacity}</p>
            <p data-table-id-status={table.table_id} className={`${table.reservation_id? "text-danger":"text-success"}`}>{table.reservation_id? "occupied":"free"}</p>
            {table.reservation_id? <button type="button" className="btn btn-info" onClick={()=>finishHandler()} data-table-id-finish={table.table_id}>Finish</button>:<></>}
         </div>;
}

export default Table;