import { useEffect, useState } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0");
  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPokemon(data.results);
        setNextUrl(data.next);
        setPreviousUrl(data.previous);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadPokemon();
  }, [url]);

  return (
    <main>
      <button
        onClick={() => {
          setUrl(previousUrl);
        }}
        type="button"
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          setUrl(nextUrl);
        }}
        type="button"
      >
        Next Page
      </button>
      <ul>
        {pokemon.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}
