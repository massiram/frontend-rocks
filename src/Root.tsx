/*import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PokeAPI } from "./api";
*/

import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  abilities: string[];
}

function Card({ pokemon }: { pokemon: Pokemon }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="w-80 mx-3 mt-6">
      <div className="rounded-2xl p-3 bg-gradient-to-b from-yellow-300 to-yellow-500 border-8 border-yellow-600 shadow-2xl">

        <div className="bg-yellow-200 border-4 border-yellow-600 rounded-xl px-3 py-1 mb-3">
          <h2 className="font-extrabold text-lg capitalize">
            {pokemon.name} - {pokemon.id}
          </h2>
        </div>

        <div className="bg-white border-4 border-yellow-600 rounded-xl p-4 mb-3 aspect-square flex items-center justify-center">
          <img
            src={pokemon.image}
            className="w-full h-full object-contain"
            alt={pokemon.name}
          />
        </div>

        <div className="bg-yellow-100 border-4 border-yellow-600 rounded-xl p-3 mb-4 text-center">
          <p className="text-sm font-semibold capitalize">
            Tipo: {pokemon.types.join(", ")}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
          >
            Dettagli
          </button>

          {showDetails && (
            <div className="mt-3 text-sm text-center capitalize">
              Abilità: {pokemon.abilities.join(", ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Root() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 12; // primo caricamento

  async function fetchPokemons(newOffset: number, amount: number) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${newOffset}&limit=${amount}`
    );
    const data = await res.json();

    const results = await Promise.all(
      data.results.map(async (p: any) => {
        const res = await fetch(p.url);
        const details = await res.json();

        return {
          id: details.id,
          name: details.name,
          image:
            details.sprites.other["official-artwork"].front_default,
          types: details.types.map((t: any) => t.type.name),
          abilities: details.abilities.map(
            (a: any) => a.ability.name
          ),
        };
      })
    );

    setPokemons((prev) => [...prev, ...results]);
  }

  useEffect(() => {
    fetchPokemons(0, limit);
  }, []);

  function loadMore() {
    const newOffset = offset + 20;
    setOffset(newOffset);
    fetchPokemons(newOffset, 20);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <button
        onClick={loadMore}
        className="mt-8 mb-10 bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-bold text-lg"
      >
        Carica altri 20 Pokémon
      </button>
    </div>
  );
}

/*
interface PokemonCard {
  id: number;
  image: string;
  name: string;
  types: string[];
}

async function fetchData(offset: number): Promise<PokemonCard[]> {
  const list = await PokeAPI.listPokemons(offset, 20);
  const pokemons = await Promise.all(
    list.results.map(async (item: { name: string; url: string }) => {
      const pokemon = await PokeAPI.getPokemonByName(item.name);
      return pokemon;
    }),
  );

  return pokemons.map((item) => ({
    id: item.id,
    image: item.sprites.other?.["official-artwork"].front_default ?? "",
    name: item.name,
    types: item.types.map((type) => type.type.name),
  }));
}*/