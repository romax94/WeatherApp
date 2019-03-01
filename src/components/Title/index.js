import React from 'react';
import './style.css';

export const Title = React.memo(({ text }) => <p className="title">{text}</p>);
