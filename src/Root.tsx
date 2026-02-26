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

  const formattedId = `#${pokemon.id.toString().padStart(3, "0")}`;

  return (
    <div className="w-80 mx-3 mt-6">
      <div className="rounded-2xl p-4 bg-gradient-to-b from-yellow-300 to-yellow-500 border-8 border-yellow-600 shadow-2xl">

        {/* PARTE ALTA */}
        <div className="flex justify-between items-center mb-3 bg-yellow-200 border-4 border-yellow-600 rounded-xl px-3 py-1">
          <div>
            <h2 className="font-extrabold text-lg capitalize">
              {pokemon.name}
            </h2>
            <span className="text-xs font-bold text-gray-700">
              {formattedId}
            </span>
          </div>

          <span className="font-bold text-red-600 text-lg">
            PS {pokemon.hp}
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

        {/* RIQUADRO TIPO */}
        <div className="bg-yellow-100 border-4 border-yellow-600 rounded-xl p-3 mb-4 text-center">
          <p className="text-sm font-semibold capitalize">
            Tipo: {pokemon.types.join(", ")}
          </p>
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

        {/* BOX DETTAGLI */}
        {open && (
          <div className="mt-4 bg-white border-4 border-yellow-600 rounded-xl p-4 text-sm">

            <div className="mb-3">
              <strong className="block mb-1">Abilità:</strong>
              <ul className="list-disc list-inside capitalize">
                {pokemon.abilities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gray-100 rounded-lg p-2">
                <strong>Attacco</strong>
                <p>{pokemon.attack}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-2">
                <strong>Difesa</strong>
                <p>{pokemon.defense}</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}