import React from 'react';
import './Pokedex.css';

const Pokemon = ({ pokemon, typesData, language, onSelect }) => {

  const handleClick = () => {
    onSelect(pokemon);
  };

  const getTypeName = (typeId) => {
    const type = typesData.find(type => type.id === typeId);
    return type ? type.name[language] : 'Inconnu';
  };

  return (
    <div className='card' onClick={handleClick}>
      <img src={pokemon.image} alt={`${pokemon.name[language]} sprite`} className='image' />
      <div className='content'>
        <h2>{pokemon.name[language]}</h2>
        <p>ID: {pokemon.id}</p>
        <p>Generation: {pokemon.generation}</p>
        <p>
          {pokemon.types.map((typeId, index) => (
            <span key={index}>{getTypeName(typeId)}{index < pokemon.types.length - 1 ? ', ' : ''}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Pokemon;