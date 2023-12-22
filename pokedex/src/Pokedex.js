import React from 'react';
import './Pokedex.css';

const Pokemon = ({ pokemon, typesData, language, onSelect }) => {
  const handleClick = () => {
    onSelect(pokemon);
  };

  const getTypeInfo = (typeId) => {
    const type = typesData.find(type => type.id === typeId);
    return type ? { name: type.name[language], image: type.image, backgroundColor: type.backgroundColor } : { name: 'Inconnu', image: 'url_de_l_image_par_defaut', backgroundColor: '#ffffff' };
  };

  // Créez une liste de classes de type
  const typeClasses = pokemon.types.map(typeId => getTypeInfo(typeId).name.toLowerCase()).join(' ');

  return (
    <div className={`card ${typeClasses}`} onClick={handleClick}>
      <div className='content'>
        <p>N°{pokemon.id}</p>
        <img src={pokemon.image} alt={`${pokemon.name[language]} sprite`} className='image' />
        <h2>{pokemon.name[language]}</h2>
        <p>Generation {pokemon.generation}</p>
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
