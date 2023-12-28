import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import "./PokemonDetail.css";

const PokemonDetail = ({ pokemon, typesData, evolutionData, language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [pokemon.image, pokemon.image_shiny];

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const getTypeName = (typeId) => {
    const type = typesData.find((type) => type.id === typeId);
    return type ? type.name[language] : "Inconnu";
  };

  const getPokemonNameById = (id) => {
    const pokemonData = evolutionData ? evolutionData.find((pokemon) => pokemon.id === id) : null;
    return pokemonData ? pokemonData.name[language] : "Inconnu";
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded shadow-lg">
      <div className="flex justify-center">
        <img
          src={images[currentImageIndex]}
          alt={`${pokemon.name[language]} sprite`}
          className={`w-32 h-32 object-cover cursor-pointer ${currentImageIndex === 1 ? 'transform rotate-360' : ''}`}
          onClick={handleImageChange}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">{pokemon.name[language]}</h2>
        <p>ID: {pokemon.id}</p>
        <p>Generation: {pokemon.generation}</p>
        <p>
          Type(s):{" "}
          {pokemon.types.map((typeId, index) => (
            <span key={index} className="mr-2">
              {getTypeName(typeId)}
            </span>
          ))}
        </p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(pokemon.stats).map(([statName, statValue]) => (
              <div key={statName} className="text-center">
                <p className="font-semibold">{statName}</p>
                <p className="text-sm">{statValue}</p>
                <div className="bg-green-500 h-2 mt-1 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        {(pokemon.evolvesTo || pokemon.evolvesFrom) && (
          <div className="mt-8">
            <h3 className="text-xl font-bold">Évolution</h3>
            {pokemon.evolvesTo && (
              <div className="mt-4">
                <h4 className="text-lg font-bold">Évolution vers l'avant</h4>
                <table className="table-auto w-full mt-2">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Pokémon</th>
                      <th className="px-4 py-2">Méthode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(pokemon.evolvesTo).map(([evolutionId, method], index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{getPokemonNameById(evolutionId)}</td>
                        <td className="border px-4 py-2">{method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {pokemon.evolvesFrom && (
              <div className="mt-4">
                <h4 className="text-lg font-bold">Évolution vers l'arrière</h4>
                <table className="table-auto w-full mt-2">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Pokémon</th>
                      <th className="px-4 py-2">Méthode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(pokemon.evolvesFrom).map(([evolutionId, method], index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{getPokemonNameById(evolutionId)}</td>
                        <td className="border px-4 py-2">{method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
