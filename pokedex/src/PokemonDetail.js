import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import "./PokemonDetail.css";
import { useTranslation } from 'react-i18next';


const PokemonDetail = ({ pokemon, typesData, language }) => {

  const {t} = useTranslation();

  // État local pour gérer l'index de l'image affichée
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Tableau des différentes images du Pokémon
  const images = [pokemon.image, pokemon.image_shiny];

  // Fonction pour changer l'image du Pokémon
  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fonction pour obtenir le nom d'un type à partir de son identifiant
  const getTypeName = (typeId) => {
    const type = typesData.find((type) => type.id === typeId);
    return type ? type.name[language] : "Inconnu";
  };

  // Rendu du détail du Pokemon
  return (
    <div className="container mx-auto p-16 rounded shadow-lg">
      <div className="flex justify-center">
        {/* Image du Pokémon avec possibilité de rotation au clic */}
        <img
          src={images[currentImageIndex]}
          alt={`${pokemon.name[language]} sprite`}
          className={`w-32 h-32 object-cover cursor-pointer ${
            currentImageIndex === 1 ? "transform rotate-360" : ""
          }`}
          onClick={handleImageChange}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">{pokemon.name[language]}</h2>
        <p>N° {pokemon.id}</p>
        <p>{t("generation")} {pokemon.generation}</p>
        <p>
          {t("kind")}:{" "}
          {pokemon.types.map((typeId, index) => (
            <span key={index} className="mr-2">
              {getTypeName(typeId)}
            </span>
          ))}
        </p>
        <p>{t("height")}: {pokemon.height}m</p>
        <p>{t("weight")}: {pokemon.weight}kg</p>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Affichage des statistiques du Pokémon avec une barre de progression */}
            {Object.entries(pokemon.stats).map(([statName, statValue]) => (
              <div key={statName} className="text-center">
                <p className="font-semibold">{statName}</p>
                <p className="text-sm text-end">{statValue}</p>
                <div className="relative">
                  <div className="bg-green-200 h-2 mt-1 rounded"></div>
                  <div
                    className="bg-green-500 h-2 absolute top-0 left-0 rounded"
                    style={{ width: `${(statValue / 160) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          {/* Affichage des informations d'évolution du Pokémon */}
          {pokemon.evolvedFrom && (
            <div className="mt-4">
              <table className="table-auto w-full">
                <tbody>
                  {Object.entries(pokemon.evolvedFrom).map(([evolutionId, method], index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">
                        <img
                          src={`https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/${evolutionId}/regular.png`}
                          alt={`${evolutionId} sprite`}
                          className="w-12 h-12 mr-2 inline"
                        />
                        N°{evolutionId}
                      </td>
                      <td className="px-4 py-2 border">{method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {pokemon.evolvesTo && (
            <div className="mt-0.4">
              <table className="table-auto w-full">
                <tbody>
                  {Object.entries(pokemon.evolvesTo).map(([evolutionId, method], index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">
                        <img
                          src={`https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/${evolutionId}/regular.png`}
                          alt={`${evolutionId} sprite`}
                          className="w-12 h-12 mr-2 inline"
                        />
                        N°{evolutionId}
                      </td>
                      <td className="px-4 py-2 border">{method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
