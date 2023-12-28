import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokedex.js';
import PokemonDetail from './PokemonDetail.js';
import "tailwindcss/tailwind.css";
import "./App.css";


const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [typesData, setTypesData] = useState([]);
  const [language, setLanguage] = useState('fr');
  const [filterType, setFilterType] = useState('all');
  const [filterGeneration, setFilterGeneration] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonResponse = await axios.get('https://pokedex-api.3rgo.tech/api/pokemon', {
          headers: {
            'accept': '*/*',
            'X-CSRF-TOKEN': '',
          },
        });

        const typesResponse = await axios.get('https://pokedex-api.3rgo.tech/api/types');
        setPokemonList(pokemonResponse.data.data);
        setTypesData(typesResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);
  
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleTypeFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
  };

  const handleGenerationFilterChange = (newFilterGeneration) => {
    setFilterGeneration(newFilterGeneration);
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(order => (order === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortOrder('asc');
    }

    setSortBy(newSortBy);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handlePokemonClick = (selectedPokemon) => {
    setSelectedPokemon(selectedPokemon);
  };

  const getSortedPokemonList = () => {
    let sortedList = [...pokemonList];

    switch (sortBy) {
      case 'id':
        sortedList.sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));
        break;
      case 'name':
        sortedList.sort((a, b) => (sortOrder === 'asc' ? a.name[language].localeCompare(b.name[language]) : b.name[language].localeCompare(a.name[language])));
        break;
      case 'weight':
        sortedList.sort((a, b) => (sortOrder === 'asc' ? a.weight - b.weight : b.weight - a.weight));
        break;
      case 'height':
        sortedList.sort((a, b) => (sortOrder === 'asc' ? a.height - b.height : b.height - a.height));
        break;
      default:
        break;
    }

    return sortedList;
  };

  const filteredPokemonList = getSortedPokemonList()
    .filter(pokemon => (filterType === 'all' || pokemon.types.includes(parseInt(filterType)))
      && (filterGeneration === 'all' || pokemon.generation === parseInt(filterGeneration))
      && pokemon.name[language].toLowerCase().includes(searchValue.toLowerCase())
    );

  const handleReturnToList = () => {
    setSelectedPokemon(null);
  };

  if (error) {
    return <p>Error loading data. Please check the console for details.</p>;
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

  if (selectedPokemon) {
    return (
      <div className="text-center">
        <div className="mt-8 flex justify-center">
          <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={handleReturnToList}>
            Retour
          </button>
        </div>
        <PokemonDetail pokemon={selectedPokemon} typesData={typesData} language={language} />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end  mt-4 mr-8">
        <img
          src="https://cdn-icons-png.flaticon.com/128/8363/8363075.png"
          alt="English flag"
          onClick={() => handleLanguageChange('en')}
          className="mr-4 cursor-pointer w-8"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/5921/5921991.png"
          alt="French flag"
          onClick={() => handleLanguageChange('fr')}
          className="mr-4 cursor-pointer w-8"
        />
      </div>
      <div className='flex justify-center items-center'>
        <img src={'https://camo.githubusercontent.com/7f1f1e69bef239378a28e8aca7d1d7bd0890d37a7871d01135e2d044da6e2157/68747470733a2f2f692e696d6775722e636f6d2f415975745a4f462e706e67'} alt="Logo" className="w-10/12 mx-0 my-8" />
      </div>
      <h1 className="text-3xl font-bold text-center">
        Julie Montoux ~ Projet React
      </h1>
      <div className="flex justify-center items-center bg-red-700 mt-4 space-x-4 my-8 p-8">
        <label>
          <input
            type="radio"
            id="ascending"
            name="sortOrder"
            value="asc"
            checked={sortOrder === 'asc'}
            onChange={() => setSortOrder('asc')}
          />
          <label htmlFor="ascending" className="cursor-pointer">&uarr;</label>
          <input
            type="radio"
            id="descending"
            name="sortOrder"
            value="desc"
            checked={sortOrder === 'desc'}
            onChange={() => setSortOrder('desc')}
          />
          <label htmlFor="descending" className="cursor-pointer">&darr;</label>
        </label>
        <label className="sort-label">
          <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)} className="p-2 border rounded">
            <option value="id">ID</option>
            <option value="name">Nom</option>
            <option value="weight">Poids</option>
            <option value="height">Taille</option>
          </select>
        </label>
        <label className="filter-label">
          <select value={filterGeneration} onChange={(e) => handleGenerationFilterChange(e.target.value)} className="p-2 border rounded">
            <option value="all">Generation</option>
            {Array.from({ length: 9 }, (_, i) => i + 1).map(generation => (
              <option key={generation} value={generation}>
                Generation {generation}
              </option>
            ))}
          </select>
        </label>
        <label className="filter-label">
          <select value={filterType} onChange={(e) => handleTypeFilterChange(e.target.value)} className="p-2 border rounded">
            <option value="all">Type</option>
            {typesData.map(type => (
              <option key={type.id} value={type.id}>
                {type.name[language]}
              </option>
            ))}
          </select>
        </label>
      <div className="flex pl-20">
        <input type="text" value={searchValue} onChange={handleSearchChange} className="p-2 border rounded" placeholder="Rechercher..."/>
      </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredPokemonList.map(pokemon => (
          <Pokemon key={pokemon.id} pokemon={pokemon} typesData={typesData} language={language} onSelect={handlePokemonClick} />
        ))}
      </div>
    </>
  );
};

export default App;
