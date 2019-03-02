import React from 'react';
import { connect } from 'react-redux';
import { convertTemp } from '../../utils';
import './style.css';

const CardItem = ({ handleClick, city, country, id, temp, tempUnits, showTemp }) => (
  <div className="card" onClick={() => handleClick && handleClick(id)}>
    <p>{city}</p>
    <p>{country}</p>
    {showTemp && <p>{convertTemp(temp, tempUnits)}</p>}
  </div>
);

const mapStateToProps = ({ tempUnits }) => ({ tempUnits });

export default connect(mapStateToProps)(CardItem);
