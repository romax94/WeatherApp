import React from 'react';
import './style.css';

export const RadioButton = ({ type, handleChange, checked }) => (
  <div>
    <input
      id={type}
      type="radio"
      name="temp-unit"
      onChange={() => handleChange(type)}
      checked={checked}
    />
    <label className="radio-label" htmlFor={type}>{type}</label>
  </div>
);
