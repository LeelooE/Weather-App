import React from "react";
const Weather = props => {
  return (
    <div className="weather">
      {props.country &&
        props.city && (
          <p>
            Location: {props.city}, {props.country}
          </p>
        )}
      {props.temperature && 
        <div className='weather-tempChange'>
          <p>Temperature: {props.originalTemp}</p>
          <p style={{color: props.fColor}} className='tempChange f' onClick={props.changeToF}>°F</p>
          <p style={{color: props.cColor}} className='tempChange c' onClick={props.changeToC}>°C</p>
        </div>
      }
      {props.humidity && <p>Humidity: {props.humidity}</p>}
      {props.description && <p>Conditions: {props.description.charAt(0).toUpperCase() + props.description.substr(1)}</p>}
      {props.error && <p>{props.error}</p>}
    </div>
  );
};
export default Weather;
