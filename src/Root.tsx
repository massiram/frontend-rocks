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
  hp: number;
  attack: number;
  defense: number;
}

function Card({ pokemon }: { pokemon: Pokemon }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-80 mx-3 mt-6">
      <div className="rounded-2xl p-4 bg-gradient-to-b from-yellow-300 to-yellow-500 border-8 border-yellow-600 shadow-2xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3 bg-yellow-200 border-4 border-yellow-600 rounded-xl px-3 py-1">
          <h2 className="font-extrabold text-lg capitalize">
            {pokemon.name}
          </h2>
          <span className="font-bold text-red-600">
            HP {pokemon.hp}
          </span>
        </div>

        {/* IMMAGINE */}
        <div className="bg-white border-4 border-yellow-600 rounded-xl p-4 mb-3 aspect-square flex items-center justify-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="object-contain h-full"
          />
        </div>

        {/* TIPO */}
        <div className="text-center mb-3 capitalize font-semibold">
          Tipo: {pokemon.types.join(", ")}
        </div>

        {/* BOTTONE */}
        <div className="flex justify-center">
          <button
            onClick={() => setOpen(!open)}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-full font-bold"
          >
            {open ? "Chiudi" : "Dettagli"}
          </button>
        </div>

        {/* RIQUADRO DETTAGLI */}
        {open && (
          <div className="mt-4 bg-white border-4 border-yellow-600 rounded-xl p-3 text-sm animate-fadeIn">
            
            <div className="mb-2">
              <strong>Abilità:</strong>
              <ul className="list-disc list-inside capitalize">
                {pokemon.abilities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center mt-2">
              <div className="bg-gray-100 rounded-lg p-2">
                <strong>Attack</strong>
                <p>{pokemon.attack}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-2">
                <strong>Defense</strong>
                <p>{pokemon.defense}</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export function Root() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);

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
          hp: details.stats.find((s: any) => s.stat.name === "hp").base_stat,
          attack: details.stats.find((s: any) => s.stat.name === "attack").base_stat,
          defense: details.stats.find((s: any) => s.stat.name === "defense").base_stat,
        };
      })
    );

    setPokemons((prev) => [...prev, ...results]);
  }

  function loadMore() {
    const newOffset = offset + 20;
    setOffset(newOffset);
    fetchPokemons(newOffset, 20);
  }

  useEffect(() => {
    fetchPokemons(0, 12);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <button
        onClick={loadMore}
        className="mt-8 mb-10 bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-bold"
      >
        Carica altri Pokémon
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