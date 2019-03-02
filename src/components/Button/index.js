import React from 'react';
import './style.css';

export const Button = React.memo(({ handleClick, text }) => (
  <button className="button" onClick={handleClick}>
    {text}
  </button>
));
