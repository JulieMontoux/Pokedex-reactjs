import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokedex.js';
import PokemonDetail from './PokemonDetail.js';

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
    return <p>Loading...</p>;
  }

  if (selectedPokemon) {
    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleReturnToList}>&larr;</button>
        <PokemonDetail pokemon={selectedPokemon} typesData={typesData} language={language} />
      </div>
    );
  }

  return (
    <>
      <div style={{ marginTop: '20px', textAlign: 'right', marginRight: '100px' }}>
        <img src="https://cdn-icons-png.flaticon.com/128/8363/8363075.png" alt="English flag" onClick={() => handleLanguageChange('en')} style={{ marginRight: '10px', width: '30px' }} />
        <img src="https://cdn-icons-png.flaticon.com/128/5921/5921991.png" alt="French flag" onClick={() => handleLanguageChange('fr')} style={{ marginRight: '10px', width: '30px' }} />
      </div>
      <h1 style={{ textAlign: 'center', color: '#e53935', marginTop: '-20px' }}>Pokédex - Julie Montoux</h1>
      <p style={{ textAlign: 'center', color: '#e53935', marginTop: '-20px', textDecoration: 'underline' }}>Projet React</p>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label>
          <input
            type="radio"
            id="ascending"
            name="sortOrder"
            value="asc"
            checked={sortOrder === 'asc'}
            onChange={() => setSortOrder('asc')}
          />
          <label htmlFor="ascending">&uarr;</label>
          <input
            type="radio"
            id="descending"
            name="sortOrder"
            value="desc"
            checked={sortOrder === 'desc'}
            onChange={() => setSortOrder('desc')}
          />
          <label htmlFor="descending">&darr;</label>
        </label>
        <label style={{ marginRight: '10px', marginLeft: '10px' }}>
          <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
            <option value="height">Height</option>
          </select>
        </label>
        <label style={{ marginRight: '10px' }}>
          <select value={filterGeneration} onChange={(e) => handleGenerationFilterChange(e.target.value)}>
            <option value="all">Generation</option>
            {Array.from({ length: 9 }, (_, i) => i + 1).map(generation => (
              <option key={generation} value={generation}>
                Generation {generation}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginRight: '10px' }}>
          <select value={filterType} onChange={(e) => handleTypeFilterChange(e.target.value)}>
            <option value="all">Type</option>
            {typesData.map(type => (
              <option key={type.id} value={type.id}>
                {type.name[language]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label>
          &#x1F50D;
          <input type="text" value={searchValue} onChange={handleSearchChange} />
        </label>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredPokemonList.map(pokemon => (
          <Pokemon key={pokemon.id} pokemon={pokemon} typesData={typesData} language={language} onSelect={handlePokemonClick} />
        ))}
      </div>
    </>
  );
};

export default App;