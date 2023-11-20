// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokemon = ({ pokemon }) => {
  const cardStyle = {
    flexWrap: 'wrap', 
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    overflow: 'hidden',
    display: 'grid',
    width: '25em',

  };

  const imageStyle = {
    width: '50%',
    height: 'auto',
    borderBottom: '1px solid #ddd',
  };

  const contentStyle = {
    padding: '20px',
  };

  const h2Style = {
    marginTop: '0',
  };

  const pStyle = {
    marginBottom: '10px',
  };

  return (
    <div style={cardStyle}>
      <img src={pokemon.image} alt={`${pokemon.name.en} sprite`} style={imageStyle} />
      <div style={contentStyle}>
        <h2 style={h2Style}>{pokemon.name.en} ({pokemon.name.fr})</h2>
        <p style={pStyle}>ID: {pokemon.id}</p>
        <p style={pStyle}>Generation: {pokemon.generation}</p>
        {/* Ajoutez le reste de l'affichage des données du Pokémon selon vos besoins */}
      </div>
    </div>
  );
};

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://pokedex-api.3rgo.tech/api/pokemon',
          headers: {
            'accept': '*/*',
            'X-CSRF-TOKEN': '',
          },
        });
        setPokemonList(response.data.data);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error loading Pokemon data. Please check the console for details.</p>;
  }

  if (!pokemonList || pokemonList.length === 0) {
    return <p>Loading...</p>;
  }

  return (
      <><h1 style={{textAlign: 'center', color: 'red', fontSize: '900', fontSize: 'xx-large', fontWeight: '900',}}>Pokédex</h1><div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {pokemonList.map(pokemon => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
          ))}
      </div></>
  );
};

export default App;
