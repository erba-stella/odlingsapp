"use client";
// type Props = {
//     categories: Promise<string[]>
// }

import React, { useEffect, useState } from "react";

type Plant = {
  name_sv: string;
  name_latin: string;
  category: string;
};

export function TestPlantForm() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/plants?categories=true");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (searchTerm) params.append("search", searchTerm);

      const res = await fetch(`/api/plants?${params.toString()}`);
      const data = await res.json();
      setPlants(data);
      setLoading(false);
    };

    fetchPlants();
  }, [selectedCategory, searchTerm]);

  return (
    <form className="">
      {/* INPUT: Add plant Name */}
      <fieldset>
        <legend>Ge växten ett namn</legend>
        <label htmlFor="plantName">växtnamn</label>
        <input type="text" id="plantName" placeholder='t.ex. "Stupice tomat"' />
      </fieldset>

      {/* INPUT: Add plant type */}
      <fieldset>
        <legend>Välj växttyp</legend>

        {/* filter by category */}
        <label htmlFor="search-by-category">Filtera efter kategori</label>
        <select
          id="search-by-category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Alla kategorier</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* search by name (swedish or latin) */}
        <label htmlFor="search-by-name">
          Sök på namn (svenska eller latin)
        </label>

        <input
          type="text"
          placeholder="t.ex. tomater"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </fieldset>
      {loading ? (
        <p>Laddar sökresultat...</p>
      ) : (
        <ul>
          {plants.map((plant, i) => (
            <li key={i}>
              <label htmlFor={plant.name_sv}>
                <b>{plant.name_sv}</b> {plant.name_latin}
                <input
                  type="radio"
                  id={plant.name_sv}
                  name="plant-type"
                  value={plant.name_sv}
                ></input>
              </label>
              {/* <p>Kategori: {plant.category}</p> */}
            </li>
          ))}
          {plants.length === 0 && <p>Inga växter matchar din sökning.</p>}
        </ul>
      )}
    </form>
  );
}
