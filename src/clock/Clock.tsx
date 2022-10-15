import React from 'react';
import './Clock.css'
import { useCountdown } from '../hooks/useCountdown';
import { Clock } from '../types';

const CountdownTimer = ({ startTime, event, backgroundImage, backgroundColour }:Clock) => {
  const targetDate = new Date(startTime).getTime();
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const style = {
    "backgroundImage": backgroundImage ? `url(${backgroundImage.secure_url})` : "none",
    "backgroundColor": backgroundColour?.hex ? backgroundColour.hex : "transparent"
  };
  if (days + hours + minutes + seconds <= 0) {
    return (<div>this is done;</div>)
  } else {
    return (
      <div className="clockHolder" style={style}>
        <div className="clockShade">
        <h2 className="title">
          {event}
        </h2>
        <div className="clock">
          <div className="digit">
            {days}
            <div className="digit-title">Days</div>
          </div>

          <div className="digit">
            {hours}
            <div className="digit-title">Hours</div>
          </div>

          <div className="digit">
            {minutes}
            <div className="digit-title">Minutes</div>
          </div>

          <div className="digit">
            {seconds}
            <div className="digit-title">Seconds</div>
          </div>
        </div>
        </div>
      </div>
    );
  }
};



export default CountdownTimer
