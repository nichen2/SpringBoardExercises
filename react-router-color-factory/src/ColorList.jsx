import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ColorDetail from './ColorDetail';

const ColorList = ({ colors }) => {
  return (
    <div>
      <h2>Colors</h2>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>
            <Link to={`/colors/${color.name.toLowerCase()}`}>{color.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorList;
