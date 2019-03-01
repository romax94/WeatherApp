import React from 'react';
import './style.css';

export const Card = ({ handleClick, city, country, id }) => (
  <div className="card" onClick={() => handleClick(id)}>
    <p>{country}, {city}</p>
  </div>
)
