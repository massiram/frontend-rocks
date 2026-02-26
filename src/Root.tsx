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
  abilityUrls: string[];
}

interface AbilityDetail {
  name: string;
  effect: string;
}

function Card({ pokemon }: { pokemon: Pokemon }) {
  const [abilitiesDetails, setAbilitiesDetails] = useState<AbilityDetail[] | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  async function loadAbilities() {
    const details = await Promise.all(
      pokemon.abilityUrls.map(async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        // Prendo la descrizione in inglese
        const effectEntry = data.effect_entries.find(
          (e: any) => e.language.name === "en"
        );

        return {
          name: data.name,
          effect: effectEntry?.effect ?? "No description",
        };
      })
    );

    setAbilitiesDetails(details);
  }

  function toggleDetails() {
    setShowDetails(!showDetails);
    if (!abilitiesDetails) {
      loadAbilities();
    }
  }

  return (
    <div className="w-80 mx-3 mt-6">
      <div className="rounded-2xl p-3 bg-gradient-to-b from-yellow-300 to-yellow-500 border-8 border-yellow-600">

        {/* Nome */}
        <h2 className="font-extrabold text-lg capitalize mb-2">
          {pokemon.name} − {pokemon.id}
        </h2>

        {/* Immagine */}
        <div className="mb-3 aspect-square border-4 border-yellow-600 rounded-xl p-4 flex items-center justify-center bg-white">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>

        {/* Tipo */}
        <p className="capitalize text-center mb-3">
          Tipo: {pokemon.types.join(", ")}
        </p>

        {/* Button Dettagli */}
        <button
          onClick={toggleDetails}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold mb-2"
        >
          {showDetails ? "Nascondi dettagli" : "Mostra dettagli"}
        </button>

        {/* Mostra Dettagli Abilità */}
        {showDetails && abilitiesDetails && (
          <div className="text-sm text-center text-gray-800">
            {abilitiesDetails.map((abil) => (
              <div key={abil.name} className="mb-2">
                <strong className="capitalize">{abil.name}</strong>
                <p>{abil.effect}</p>
              </div>
            ))}
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
          abilityUrls: details.abilities.map(
            (a: any) => a.ability.url
          ),
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
        className="mt-6 mb-10 bg-red-600 text-white px-10 py-3 rounded-full font-bold"
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