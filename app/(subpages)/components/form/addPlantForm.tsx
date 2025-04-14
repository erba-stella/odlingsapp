"use client";

import React, { useEffect, useState } from "react";
import {
  fetchPlantData,
  fetchPlantCategoryData,
} from "@/data-access/fetch-data";

import { useLocalStorage } from "@/lib/utils/localstorage";

type Plant = {
  name_sv: string;
  name_latin: string;
  alias?: string[];
  category?: string;
};

export const AddPlantForm = () => {
  const [customName, setCustomName] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("alla");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSwedish, setSearchSwedish] = useState(true);
  const [searchLatin, setSearchLatin] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [storedPlantList, setStoredPlantList] = useLocalStorage(
    "my-plant-list",
    ""
  );

  // Fetch categories once ()
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPlantCategoryData();
        setCategories(data);
      } catch (err) {
        console.error("Fetch PlantCategories error:", err);
      }
    };
    loadData();
  }, []);

  // Fetch filtered plant list on changes
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (selectedCategory !== "alla") {
      queryParams.append("category", selectedCategory);
    }

    if (searchTerm.trim().length > 0) {
      queryParams.append("search", searchTerm.trim());

      let lang = "";
      if (searchSwedish && !searchLatin) lang = "sv";
      if (searchLatin && !searchSwedish) lang = "latin";

      if (lang) {
        queryParams.append("lang", lang);
      }
    }

    const loadData = async () => {
      try {
        const data = await fetchPlantData(`?${queryParams.toString()}`);
        setFilteredPlants(data);
      } catch (err) {
        console.error("Error: Fetch filtered plants:", err);
      }
    };

    loadData();
  }, [selectedCategory, searchTerm, searchSwedish, searchLatin]);

  // Save Plant on form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customName || !selectedPlant) {
      alert("Fyll i ett växtnamn och välj en växttyp.");
      return;
    }

    setCustomName("");
    setSearchTerm("");
    setFilteredPlants([]);
    setSelectedPlant(null);

    const plantList =
      storedPlantList && typeof storedPlantList === "string"
        ? JSON.parse(storedPlantList)
        : [];

    plantList.unshift({
      customName,
      created: new Date().toISOString(),
      linkedTo: selectedPlant,
    });

    setStoredPlantList(JSON.stringify(plantList));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Ge växten ett namn</legend>
        <label htmlFor="plantName">Växtnamn</label>
        <input
          type="text"
          id="plantName"
          placeholder='t.ex. "Stupice tomat"'
          value={customName}
          required
          onChange={(e) => setCustomName(e.target.value)}
        />
      </fieldset>

      <fieldset>
        <legend>Välj växttyp</legend>

        <div>
          <label htmlFor="filter">Filtrera efter kategori</label>
          <select
            id="filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="alla">Alla kategorier</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-plant">Sök växttyp</label>
          <input
            id="search-plant"
            type="text"
            placeholder="t.ex. tomat"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedPlant(null); // Rensa vald växt vid ny sökning
            }}
          />

          <div>
            <label htmlFor="search-swedish">svenska namn</label>
            <input
              type="checkbox"
              id="search-swedish"
              checked={searchSwedish}
              onChange={() => setSearchSwedish((prev) => !prev)}
            />

            <label htmlFor="search-latin">latinska namn</label>
            <input
              type="checkbox"
              id="search-latin"
              checked={searchLatin}
              onChange={() => setSearchLatin((prev) => !prev)}
            />
          </div>

          {filteredPlants.length > 0 && (
            <ul
              style={{
                border: "1px solid #ccc",
                padding: "0.5rem",
                maxHeight: "150px",
                overflowY: "auto",
              }}
            >
              {filteredPlants.map((p) => (
                <li
                  key={p.name_sv}
                  style={{
                    padding: "0.3rem",
                    cursor: "pointer",
                    backgroundColor:
                      selectedPlant?.name_sv === p.name_sv
                        ? "#e0f7fa"
                        : "white",
                  }}
                  onClick={() => {
                    setSelectedPlant(p);
                    setSearchTerm(`${p.name_sv} (${p.name_latin})`);
                    setFilteredPlants([]);
                  }}
                >
                  <div>
                    <strong>{p.name_sv}</strong>
                    {p.alias && p.alias.length > 0 && (
                      <div style={{ fontSize: "0.8rem", color: "#666" }}>
                        alias: {p.alias.join(", ")}
                      </div>
                    )}
                    <div style={{ color: "#666" }}>({p.name_latin})</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </fieldset>

      <button type="submit">Spara växt till din lista</button>
    </form>
  );
};