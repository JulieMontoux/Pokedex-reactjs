import React, { useState, useEffect } from 'react';
import './App.css';
import Pokedex from './Pokedex.js';
import sachaImage from './images/sacha.png';
import pokeballImage from './images/pokeball.png';

const App = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app">
      {showAnimation && (
        <div className="animation-container">
          <div className="sacha-container">
            <img src={sachaImage} alt="Sacha" />
          </div>
          <div className="pokeball-animation">
            <img src={pokeballImage} alt="Pokeball" />
          </div>
        </div>
      )}
      {!showAnimation && (
        <div className="content">
          <Pokedex />
        </div>
      )}
    </div>
  );
};

export default App;
