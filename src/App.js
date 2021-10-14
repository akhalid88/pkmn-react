import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
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

    setPokemonData(_pokemonData);
  }

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Navbar />
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
          <Footer/>
        </>
      )}
    </div>
  );
}

export default App;
