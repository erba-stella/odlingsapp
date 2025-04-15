"use client";

import styles from "@/app/(subpages)/subpages.module.css";
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

    if (!selectedPlant) {
      alert("Välj en växttyp.");
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
    <form
      onSubmit={handleSubmit}
      className={styles.addPlantForm}
      aria-labelledby="heading-plantform"
    >
      <h3 id="heading-plantform">Lägg till ny växt</h3>
      <fieldset aria-label="Ange växtens namn">
        <label htmlFor="plantName">Växtens namn:</label>
        <input
          type="text"
          id="plantName"
          placeholder='t.ex. "Stupice tomat"'
          value={customName}
          autoComplete="off"
          required
          onChange={(e) => setCustomName(e.target.value)}
        />
      </fieldset>

      <fieldset>
        <legend>Välj typ av växt</legend>

        {/* FILTER BY CATEGORY */}
        <div className={styles.categoryfilterWrapper}>
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

        <div className={styles.comboboxWrapper}>
          <label htmlFor="search-plant">Sök växttyp</label>
          <input
            id="search-plant"
            role="combobox"
            aria-controls="plant-type-list"
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-expanded="false"
            type="text"
            placeholder="t.ex. tomat"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedPlant(null); // Rensa vald växt vid ny sökning
            }}
          />

          <div className={styles.checkboxGroup}>
            <p>Sök på namn:</p>
            <label>
              svenska
              <input
                type="checkbox"
                id="search-swedish"
                checked={searchSwedish}
                onChange={() => setSearchSwedish((prev) => !prev)}
              />
            </label>
            <label>
              latin
              <input
                type="checkbox"
                id="search-latin"
                checked={searchLatin}
                onChange={() => setSearchLatin((prev) => !prev)}
              />
            </label>
          </div>

          {filteredPlants.length > 0 && (
            <div className={styles.filteredPlants}>
              <ul>
                {filteredPlants.map((p) => (
                  <li key={p.name_sv}>
                    <label
                      style={{
                        border:
                          selectedPlant?.name_sv === p.name_sv
                            ? "2px solid #007B8A"
                            : "1px solid #ccc",
                        borderRadius: "6px",
                        backgroundColor:
                          selectedPlant?.name_sv === p.name_sv
                            ? "#e0f7fa"
                            : "#fff",
                      }}
                    >
                      <input
                        type="checkbox"
                        className={`visuallly-hidden`}
                        id={p.name_sv}
                        value={p.name_sv}
                        checked={selectedPlant?.name_sv === p.name_sv}
                        onChange={() => {
                          setSelectedPlant(p);
                          setSearchTerm(`${p.name_sv} (${p.name_latin})`);
                          setFilteredPlants([]);
                        }}
                      />

                      <strong>{p.name_sv}</strong>
                      <span style={{ color: "#666" }}>({p.name_latin})</span>

                      {p.alias && p.alias.length > 0 && (
                        <span style={{ fontSize: "0.8rem", color: "#666" }}>
                          alias: {p.alias.join(", ")}
                        </span>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {filteredPlants.length === 0 && <p className={styles.error}>Inga växter matchar din sökning.</p>}
      </fieldset>

      <button type="submit">Spara växt till din lista</button>
    </form>
  );
};
