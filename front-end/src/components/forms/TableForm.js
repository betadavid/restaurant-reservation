import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function TableForm({table = {table_name:"" ,
    capacity: 0
  }, handleSubmit}){

  const history = useHistory();

  const initialFormState = {table_name: table.table_name,
    capacity: table.capacity
  };

  const [formData, setFormData] = useState({...initialFormState});

  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    });
  };

  const handleCancel = () => {
    history.goBack();
  }

  return <form onSubmit={(event)=> handleSubmit(event, formData)}> 
            <label htmlFor="table_name">First Name:</label>
            <input
              id="table_name" 
              name="table_name"
              type="text"
              placeholder="Table Name" 
              onChange={handleChange}
              value={formData.table_name}
              required minLength="2"
            />
            <label htmlFor="capacity">Party size: </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              onChange={handleChange}
              value={formData.capacity}
              required
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={()=>handleCancel()}>Cancel</button>
          </form >;
}

export default TableForm;