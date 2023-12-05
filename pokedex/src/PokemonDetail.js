import React from 'react';
import './App';
import './PokemonDetail.css';

const PokemonDetail = ({ pokemon, typesData, language }) => {

    const gaugeStyle = (value) => ({
      height: '100%',
      width: `${(value / 150) * 100}%`,
      backgroundColor: '#4CAF50', // Vous pouvez changer la couleur de la jauge ici
      borderRadius: '5px',
    });
  
    const getTypeName = (typeId) => {
      const type = typesData.find(type => type.id === typeId);
      return type ? type.name[language] : 'Inconnu';
    };
  
    return (
      <div className='detail'>
        <img src={pokemon.image} alt={`${pokemon.name[language]} sprite`} className='image' />
        <div className='content'>
          <h2>{pokemon.name[language]}</h2>
          <p>ID: {pokemon.id}</p>
          <p>Generation: {pokemon.generation}</p>
          <p>
            Type(s): {pokemon.types.map((typeId, index) => (
              <span key={index}>{getTypeName(typeId)}{index < pokemon.types.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <div className='stats'>
          <div className='stat-column'>
            <p className='stat-label'>HP</p>
            <p className='stat-label'>ATK</p>
            <p className='stat-label'>DEF</p>
            <p className='stat-label'>VIT</p>
            <p className='stat-label'>Spe. ATK</p>
            <p className='stat-label'>Spe. DEF</p>
          </div>
          <div className='stat-column'>
            {Object.entries(pokemon.stats).map(([statName, statValue]) => (
              <div key={statName}>
                <p className='stat-value'>{statValue}</p>
                <div className='gauge-container'>
                  <div style={gaugeStyle(statValue)}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    );
  };
  
export default PokemonDetail;