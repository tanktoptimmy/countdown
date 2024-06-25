import React from 'react';
import './Hero.css'

const Hero = ({title}:{title:string}) => {
  return (<header className="hero">
      <h1 className="hero-title">{title}</h1>
  </header>)
};



export default Hero
