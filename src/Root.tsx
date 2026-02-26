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
  return (
    <div className="w-80 mx-3 mt-6">
      
      {/* Card Container */}
      <div className="rounded-2xl p-3 bg-gradient-to-b from-yellow-300 to-yellow-500 border-8 border-yellow-600 shadow-2xl">

        {/* Nome */}
        <div className="bg-yellow-200 border-4 border-yellow-600 rounded-xl px-3 py-1 flex justify-between items-center mb-3">
          <h2 className="font-extrabold text-lg capitalize tracking-wide">
            {props.name}
          </h2>
          <span className="text-sm font-bold">Basic</span>
        </div>

        {/* Immagine */}
        <div className="bg-gradient-to-b from-blue-100 to-blue-200 border-4 border-yellow-600 rounded-xl p-4 mb-3 aspect-square flex items-center justify-center shadow-inner">
          <img
            src={props.image}
            className="w-full h-full object-contain drop-shadow-lg"
            alt={props.name}
          />
        </div>

        {/* Tipo */}
        <div className="bg-yellow-100 border-4 border-yellow-600 rounded-xl p-3 mb-4 text-center">
          <p className="text-sm font-semibold capitalize">
            Tipo: {props.types.join(", ")}
          </p>
        </div>

        {/* Bottone */}
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-8 py-2 rounded-full font-bold text-md shadow-lg active:scale-95">
            Dettagli
          </button>
        </div>

      </div>
    </div>
  );
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