import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getAllTypes, getPokemon } from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Dropdown } from 'react-bootstrap';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';
  const typeUrl = 'https://pokeapi.co/api/v2/type/';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      let typeResponse = await getAllTypes(typeUrl);
      // console.log(typeResponse.results[0]);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      await setTypes(typeResponse.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    // console.log(_pokemonData);
    setPokemonData(_pokemonData);
  }

  // const loadingTypes = async (data) => {
  //   let _typeData = await Promise.all(
  //     console.log(data)
  //     // data.map(async type => {
  //     //   let typeRecord = type;
  //     //   return typeRecord;
  //     // })
  //   )
  //   setTypes(_typeData);
  // }

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Navbar />
          <div className="filter">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Type Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {types.map((type, i) => {
                  return <Dropdown.Item key={i} href={type.name}>{type.name}</Dropdown.Item>
                })}
                {/* <Dropdown.Item href="#/action-1">Normal</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="btn">
            {prevUrl ? (<button onClick={prev}>Prev</button>) : <div></div>}
            {nextUrl ? (<button onClick={next}>Next</button>) : <div></div>}
          </div>
          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
            })}
          </div>
          <div className="btn">
            {prevUrl ? (<button onClick={prev}>Prev</button>) : <div></div>}
            {nextUrl ? (<button onClick={next}>Next</button>) : <div></div>}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
