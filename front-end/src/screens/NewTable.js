import React from "react";
import { useHistory } from "react-router-dom";
import TableForm from "../components/forms/TableForm";
import { createTable } from "../utils/api";

function NewTable(){
  const history = useHistory();

  async function handleSubmit(event, table){
    event.preventDefault();
    const abortController = new AbortController();
    try{
      await createTable(table, abortController.signal);
      history.push("/dashboard");
    }catch(error){
      throw error;
    }
    return () => abortController.abort();
  }

  return <>
            <h2>New Table</h2>
            <TableForm handleSubmit={handleSubmit}/>
         </>;
}

export default NewTable;