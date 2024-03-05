import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ errors }) {
  if(errors[0] && errors.length !== 0){
    console.log("rendering");
    return (
        <div className="alert alert-danger m-2">
          <p>Error:</p>
          {errors.map(error => <p key={errors.indexOf(error)}>{error.message}</p>)}
        </div>
      );
  }
  return null;
}

export default ErrorAlert;
