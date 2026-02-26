/*import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PokeAPI } from "./api";
*/

interface Props {
  image: string;
  name: string;
  types: string[];
}

function Card(props: Props) {
  return <div className="bg-yellow-300 rounded-3xl p-6 w-80 mx-3 mt-3 shadow-xl border-4 border-yellow-400">
    <div className="text-center font-bold mb-2 text-lg">{props.name}</div>
    <div className="bg-white rounded-2xl p-4 mb-4 border-4 border-yellow-400 aspect-square flex items-center justify-center">
      <img src={props.image} className="w-full h-full object-contain" />
    </div>
    <div className="bg-yellow-100 rounded-xl p-4 mb-4">
      <div className="text-xs text-gray-700">Tipo: {props.types.join(", ")}</div>
    </div>
    <div className="flex justify-center">
      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-md">
        dettagli
      </button>
    </div>
  </div>;
}

export function Root() {
  return <Card
    image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
    name="Pikachu - 0"
    types={["electric"]}
    />
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