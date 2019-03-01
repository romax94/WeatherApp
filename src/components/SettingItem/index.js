import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';

export const SettingItem = ({ name }) => {
  const marks = {
    100: {
      style: {
        color: '#f50'
      },
      label: <strong>100°C</strong>
    }
  };
  return (
    <div className="settings-item">
      <Slider marks={marks} vertical />
      <p className="settings-city">{name}</p>
    </div>
  );
};
