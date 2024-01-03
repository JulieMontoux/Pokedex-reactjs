import React from 'react';

const Pokemon = ({ pokemon, typesData, language, onSelect }) => {
  // Fonction appelée lors du clic sur un Pokémon
  const handleClick = () => {
    onSelect(pokemon);
  };

  // Fonction pour obtenir les informations sur un type à partir de son identifiant
  const getTypeInfo = (typeId) => {
    const type = typesData.find(type => type.id === typeId);

    return type ? { name: type.name[language], image: type.image, backgroundColor: type.backgroundColor } : { name: 'Inconnu', image: 'url_de_l_image_par_defaut', backgroundColor: '#ffffff' };
  };

  // Rendu du Pokémon
  return (
    <div className={`flex justify-center items-center bg-gray-100 p-4 rounded cursor-pointer`} onClick={handleClick}>
      <div className='content text-center'>
        <p className="text-lg">N°{pokemon.id}</p>
        <img src={pokemon.image} alt={`${pokemon.name[language]} sprite`} className='w-24 h-24 mx-auto mb-2' />
        <h1 className="text-xl font-bold">{pokemon.name[language]}</h1>
        <p className="text-lg">Generation {pokemon.generation}</p>
        <div className="flex justify-center mt-2">
          {pokemon.types.map((typeId, index) => (
            <span key={index} className={`text-white px-2 py-1`}>
              <img src={getTypeInfo(typeId).image} alt={`${getTypeInfo(typeId).name} type`} className="w-5 h-5 rounded-full" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
