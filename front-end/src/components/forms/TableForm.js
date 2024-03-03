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
          <div className="form-group">
              <label htmlFor="table_name">First Name:</label>
              <input
                id="table_name" 
                name="table_name"
                type="text"
                placeholder="Table Name" 
                onChange={handleChange}
                value={formData.table_name}
                required minLength="2"
                className="form-control form-control-lg border-dark"/>
              <label htmlFor="capacity">Party size: </label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                onChange={handleChange}
                value={formData.capacity}
                required
                className="form-control form-control-lg border-dark"/>
              <div className="mt-3">
                <button type="submit" className="btn btn-info btn-lg btn-block">Submit</button>
                <button type="button" onClick={()=>handleCancel()} className="btn btn-secondary btn-lg btn-block">Cancel</button>
              </div>
          </div>
        </form >;
}

export default TableForm;