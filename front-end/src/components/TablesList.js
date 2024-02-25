import React from "react";
import Table from "./Table";

function TablesList({tables}){
  return <ul className="list-group list-group-flush">
            {tables.map(table => <li key={table.table_id} className="list-group-item"><Table table={table}/></li>)}
         </ul>;
}

export default TablesList;