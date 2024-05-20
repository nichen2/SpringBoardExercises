import React from 'react';
import { useParams } from 'react-router-dom';

const ColorDetail = ({ colors }) => {
  const { colorName } = useParams();
  const color = colors.find(c => c.name.toLowerCase() === colorName.toLowerCase());

  if (!color) return <div>Color not found</div>;

  return (
    <div>
      <h2>{color.name}</h2>
      <div
        style={{
          backgroundColor: color.color,
          width: '100px',
          height: '100px'
        }}
      ></div>
    </div>
  );
};

export default ColorDetail;
