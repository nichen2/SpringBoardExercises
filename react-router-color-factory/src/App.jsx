import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import ColorList from './ColorList';
import ColorForm from './ColorForm';
import ColorDetail from './ColorDetail';

const App = () => {
  const [colors, setColors] = useState([
    { name: 'Red', color: '#ff0000' },
    { name: 'Green', color: '#00ff00' },
    { name: 'Blue', color: '#0000ff' },
  ]);

  const addColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/colors">Home</Link></li>
            <li><Link to="/add-color">Add Color</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/colors" element={<ColorList colors={colors} />} />
          <Route exact path="/colors/:colorName" element={<ColorDetail colors={colors}/>} />
          <Route exact path="/colors/new" element={<ColorForm addColor={addColor} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
