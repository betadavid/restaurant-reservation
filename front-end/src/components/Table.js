import React from "react";

function Table({table}){
  return <div>
            <h2>{table.table_name}</h2>
            <p>Capacity: {table.capacity}</p>
            <p data-table-id-status={table.table_id}>{table.reservation_id? "occupied":"free"}</p>
         </div>;
}

export default Table;