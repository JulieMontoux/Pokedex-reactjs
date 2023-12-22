import React, { useState } from "react";
import "./App.css";
import "./PokemonDetail.css";

const PokemonDetail = ({ pokemon, typesData, evolutionData, language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [pokemon.image, pokemon.image_shiny];

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const gaugeStyle = (value) => ({
    height: "100%",
    width: `${(value / 150) * 100}%`,
    backgroundColor: "#4CAF50",
    borderRadius: "5px",
  });

  const getTypeName = (typeId) => {
    const type = typesData.find((type) => type.id === typeId);
    return type ? type.name[language] : "Inconnu";
  };

  const getPokemonNameById = (id) => {
    const pokemonData = evolutionData ? evolutionData.find((pokemon) => pokemon.id === id) : null;
    return pokemonData ? pokemonData.name[language] : "Inconnu";
  };
  

  console.log("pokemon:", pokemon);
  console.log("evolutionData:", evolutionData);

  return (
    <div className="detail">
      <div>
        <img
          src={images[currentImageIndex]}
          alt={`${pokemon.name[language]} sprite`}
          className={`image-carrousel ${currentImageIndex === 1 ? 'rotate' : ''}`}
          onClick={handleImageChange}
        />
      </div>
      <div className="content">
        <h2>{pokemon.name[language]}</h2>
        <p>ID: {pokemon.id}</p>
        <p>Generation: {pokemon.generation}</p>
        <p>
          Type(s):{" "}
          {pokemon.types.map((typeId, index) => (
            <span key={index}>
              {getTypeName(typeId)}
              {index < pokemon.types.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <div className="stats">
          <div className="stat-column">
            {Object.entries(pokemon.stats).map(([statName, statValue]) => (
              <div key={statName}>
                <p className="stat-label">{statName}</p>
                <p className="stat-value">{statValue}</p>
                <div className="gauge-container">
                  <div style={gaugeStyle(statValue)}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {(pokemon.evolvesTo || pokemon.evolvesFrom) && (
          <div className="evolution">
            <h3>Évolution</h3>
            {pokemon.evolvesTo && (
              <div>
                <h4>Évolution vers l'avant</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Pokémon</th>
                      <th>Méthode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(pokemon.evolvesTo).map(([evolutionId, method], index) => (
                      <tr key={index}>
                        <td>{getPokemonNameById(evolutionId)}</td>
                        <td>{method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {pokemon.evolvesFrom && (
              <div>
                <h4>Évolution vers l'arrière</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Pokémon</th>
                      <th>Méthode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(pokemon.evolvesFrom).map(([evolutionId, method], index) => (
                      <tr key={index}>
                        <td>{getPokemonNameById(evolutionId)}</td>
                        <td>{method}</td>
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
