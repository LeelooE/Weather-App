import React from 'react';
import Skycons from 'react-skycons';

const Icon = (props) =>{
  return (
    <div className="icon">
    {props.showIcon ? 
      <Skycons 
        color='#666' 
        icon={props.icon} 
        autoplay={true}
      /> 
      : 
      undefined}
    </div>
  )
}
export default Icon;
