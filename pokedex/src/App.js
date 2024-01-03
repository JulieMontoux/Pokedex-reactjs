import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokemon from "./Pokedex.js";
import PokemonDetail from "./PokemonDetail.js";
import "tailwindcss/tailwind.css";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [typesData, setTypesData] = useState([]);
  const [language, setLanguage] = useState("fr");
  const [filterType, setFilterType] = useState("all");
  const [filterGeneration, setFilterGeneration] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonResponse = await axios.get(
          "https://pokedex-api.3rgo.tech/api/pokemon",
          {
            headers: {
              accept: "*/*",
              "X-CSRF-TOKEN": "",
            },
          }
        );

        // Récupération des types de Pokémon
        const typesResponse = await axios.get(
          "https://pokedex-api.3rgo.tech/api/types"
        );
        
        // Mise à jour des états avec les données récupérées
        setPokemonList(pokemonResponse.data.data);
        setTypesData(typesResponse.data.data);
      } catch (error) {
        // Gestion des erreurs
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  // Fonction pour changer la langue
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Fonctions pour gérer les filtres et le tri
  const handleTypeFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
  };

  const handleGenerationFilterChange = (newFilterGeneration) => {
    setFilterGeneration(newFilterGeneration);
  };

  const handleSortChange = (newSortBy) => {
    // Gestion du changement de tri et d'ordre
    if (newSortBy === sortBy) {
      setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
    } else {
      setSortOrder("asc");
    }

    setSortBy(newSortBy);
  };

  // Fonction pour gérer le changement dans la barre de recherche
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Fonction pour gérer le clic sur un Pokémon
  const handlePokemonClick = (selectedPokemon) => {
    setSelectedPokemon(selectedPokemon);
  };

  // Fonction pour obtenir la liste triée des Pokémons
  const getSortedPokemonList = () => {
    let sortedList = [...pokemonList];

    switch (sortBy) {
      case "id":
        sortedList.sort((a, b) =>
          sortOrder === "asc" ? a.id - b.id : b.id - a.id
        );
        break;
      case "name":
        sortedList.sort((a, b) =>
          sortOrder === "asc"
            ? a.name[language].localeCompare(b.name[language])
            : b.name[language].localeCompare(a.name[language])
        );
        break;
      case "weight":
        sortedList.sort((a, b) =>
          sortOrder === "asc" ? a.weight - b.weight : b.weight - a.weight
        );
        break;
      case "height":
        sortedList.sort((a, b) =>
          sortOrder === "asc" ? a.height - b.height : b.height - a.height
        );
        break;
      default:
        break;
    }

    return sortedList;
  };

  // Filtrage de la liste des Pokémon
  const filteredPokemonList = getSortedPokemonList().filter(
    (pokemon) =>
      (filterType === "all" || pokemon.types.includes(parseInt(filterType))) &&
      (filterGeneration === "all" ||
        pokemon.generation === parseInt(filterGeneration)) &&
      pokemon.name[language].toLowerCase().includes(searchValue.toLowerCase())
  );

  // Fonction pour retourner à la liste des Pokémon
  const handleReturnToList = () => {
    setSelectedPokemon(null);
  };

  // Gestion des cas d'erreur ou de chargement initial
  if (error) {
    return <p>Erreur lors du chargement des données. Veuillez vérifier la console pour plus de détails.</p>;
  }

  if (!pokemonList || pokemonList.length === 0 || !typesData) {
    return (
      <>
        <div className="shadow"></div>
        <div className="pokeball">
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="middle"></div>
        </div>
      </>
    );
  }

  // Bouton retour lors de la sélection d'un Pokémon
  if (selectedPokemon) {
    return (
      <div className="text-center">
        <div className="mt-8 flex justify-center">
          <button
            className="bg-red-700 text-white px-4 py-2 rounded"
            onClick={handleReturnToList}
          >
            Retour
          </button>
        </div>
        <PokemonDetail
          pokemon={selectedPokemon}
          typesData={typesData}
          language={language}
        />
      </div>
    );
  }

  // Affichage de la liste principale des Pokémon
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-end mt-4 mr-8">
        <img
          src="https://cdn-icons-png.flaticon.com/128/8363/8363075.png"
          alt="Drapeau anglais"
          onClick={() => handleLanguageChange("en")}
          className="mr-4 cursor-pointer w-8"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/5921/5921991.png"
          alt="Drapeau français"
          onClick={() => handleLanguageChange("fr")}
          className="mr-4 cursor-pointer w-8"
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/pt/7/77/Pok%C3%A9dex_3D_logo.png"
          }
          alt="Logo"
          className="w-10/12 mx-0 my-8"
        />
      </div>
      <h3 className="text-3xl font-bold text-center">
        Mme la Star ~ Projet React
      </h3>
      <div className="flex flex-col lg:flex-row justify-center items-center mt-4 space-y-4 lg:space-x-4 my-8 p-8">
        <div className="flex space-x-4 items-center">
          <label>
            <input
              type="radio"
              id="ascending"
              name="sortOrder"
              value="asc"
              checked={sortOrder === "asc"}
              onChange={() => setSortOrder("asc")}
            />
            <label htmlFor="ascending" className="cursor-pointer">
              &uarr;
            </label>
          </label>
          <label>
            <input
              type="radio"
              id="descending"
              name="sortOrder"
              value="desc"
              checked={sortOrder === "desc"}
              onChange={() => setSortOrder("desc")}
            />
            <label htmlFor="descending" className="cursor-pointer">
              &darr;
            </label>
          </label>
        </div>

        <div className="sort-label">
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="id">ID</option>
            <option value="name">Nom</option>
            <option value="weight">Poids</option>
            <option value="height">Taille</option>
          </select>
        </div>

        <div className="filter-label">
          <select
            value={filterGeneration}
            onChange={(e) => handleGenerationFilterChange(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">Génération</option>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((generation) => (
              <option key={generation} value={generation}>
                Génération {generation}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-label">
          <select
            value={filterType}
            onChange={(e) => handleTypeFilterChange(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">Type</option>
            {typesData.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name[language]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:pl-20">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            className="p-2 border rounded mt-4 lg:mt-0"
            placeholder="Rechercher..."
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 max-w-6xl mx-auto">
        {filteredPokemonList.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            pokemon={pokemon}
            typesData={typesData}
            language={language}
            onSelect={handlePokemonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
