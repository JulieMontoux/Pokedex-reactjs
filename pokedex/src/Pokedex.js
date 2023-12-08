import React from 'react';
import './Pokedex.css';

const Pokemon = ({ pokemon, typesData, language, onSelect }) => {

  const handleClick = () => {
    onSelect(pokemon);
  };

  const getTypeInfo = (typeId) => {
    const type = typesData.find(type => type.id === typeId);
    return type ? { name: type.name[language], image: type.image } : { name: 'Inconnu', image: 'url_de_l_image_par_defaut' };
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
            <span key={index} className="type-icon">
              <img src={getTypeInfo(typeId).image} alt={`${getTypeInfo(typeId).name} type`} />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Pokemon;
