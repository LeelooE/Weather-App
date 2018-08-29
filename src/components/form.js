import React from "react";
const Form = props => {
  return (
    <div className='whole-form'>
      <form className="form" onSubmit={props.loadWeather}>
        <input
          type="text"
          className="text-input"
          name="city"
          placeholder="City..."
        />
        <input
          type="text"
          className="text-input"
          name="country"
          placeholder="Country..."
        />
        <button className='button'>Get Weather</button>
      </form>
      <div className="form">
        <button className='button' onClick={props.loadLocation}>Use Current Location</button>
      </div>
    </div>
  );
};
export default Form;
