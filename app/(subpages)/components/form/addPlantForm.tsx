"use client";

import styles from "@/app/(subpages)/subpages.module.css";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { fetchPlantData } from "@/data-access/fetch-data";
import { CustomPlant, PlantData } from "@/lib/interfaces";
import { useLocalStorage } from "@/lib/utils/localstorage";
import { ToggleSwitch } from "@/app/(subpages)/components/ui/switch/toggleSwitch";


export const AddPlantForm = () => {
  // Input values
  const [customName, setCustomName] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);
  // Search filter
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSwedish, setSearchSwedish] = useState(true);
  const [searchLatin, setSearchLatin] = useState(false);
  // Search results
  const [filteredPlants, setFilteredPlants] = useState<PlantData[]>([]);
  // Error fetching data
  const [error, setError] = useState<string | null>(null);
  // Validation Error Messages
  const [validationErrorName, setValidationErrorName] = useState<string | null>(
    null
  );
  const [validationErrorPlant, setValidationErrorPlant] = useState<string | null>(
    null
  );
  // Save plant on submit
  const [storedPlantList, setStoredPlantList] = useLocalStorage(
    "my-plant-list",
    ""
  );
  // Save plant on submit
  const [PlantSavedToStorage, setPlantSavedToStorage] = useLocalStorage(
    "plant-saved",
    ""
  );
  // URL search params
  const router = useRouter();
  const pathname = usePathname();
  // Saved custom plant
  const [savedPlants, setSavedPlants] = useState<CustomPlant[]>([]);

  /*
      VARIABLES
  */

  // Criteria for expanding the listbox
  const listboxExpanded =
    filteredPlants.length > 0 && searchTerm !== "" && selectedPlant === null;
  // When to show a message that no plants matches the search queries
  const noMatchingSearchResults =
    filteredPlants.length === 0 && !error && !selectedPlant;
  // Message about current search terms
  const currentSearch = `${
    searchSwedish && !searchLatin
      ? "svenska namn "
      : !searchSwedish && searchLatin
      ? "latinska namn "
      : "namn "
    } som börjar på "${searchTerm}"`;
  // Check if validation error
  const isValidationError = validationErrorName || validationErrorPlant;

  /* 
      FETCH FILTERED PLANT LIST
  */

  useEffect(() => {
    const queryParams = new URLSearchParams();

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
        setError(
          "Tyvärr går det inte att hämta växttyper just nu. Försök gärna senare."
        );
        console.error("Error: Fetch filtered plants:", err);
      }
    };

    loadData();
  }, [searchTerm, searchSwedish, searchLatin]);

  /*
      HANDLE SUBMIT (Save Plant on form submission and add new plant to list)
  */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPlant || !customName) {

      const nameMsg = customName ? null : "Skriv växtens namn";
      const plantMsg = selectedPlant ? null : "Välj växttyp";

      setValidationErrorName(nameMsg);
      setValidationErrorPlant(plantMsg);
      
      return;
    }

    setCustomName("");
    setSearchTerm("");
    setFilteredPlants([]);
    setSelectedPlant(null);

    const created = new Date().toISOString();
    const newPlant = {
      customName,
      created,
      linkedTo: selectedPlant,
    };

    // Show currently saved plants
    const saved = savedPlants;
    saved.unshift(newPlant);
    setSavedPlants(saved);

    // Save to local storage
    const plantList =
      storedPlantList && typeof storedPlantList === "string"
        ? JSON.parse(storedPlantList)
        : [];

    plantList.unshift(newPlant);
    setStoredPlantList(JSON.stringify(plantList));

    if (PlantSavedToStorage || PlantSavedToStorage === "")
      setPlantSavedToStorage(JSON.stringify(savedPlants));

    // URL-state to plant-list
    router.push(
      `${pathname}?created=${created}}`
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.addPlantForm}
        aria-labelledby="form-heading"
      >
        <h3 id="form-heading">Lägg till ny växt</h3>

        {/* ----------  CUSTOM NAME ---------- */}
        <fieldset>
          <legend className="visually-hidden">Ange växtens namn</legend>
          <label htmlFor="plantName">Växtens namn*</label>
          <input
            type="text"
            id="plantName"
            placeholder='t.ex. "Stupice tomat"'
            value={customName}
            autoComplete="off"
            aria-required={true}
            onChange={(e) => setCustomName(e.target.value)}
          />
        </fieldset>
        {/* ----------  TYPE OF PLANT ---------- */}
        <fieldset>
          <legend className="visually-hidden">Ange typ av växt</legend>
          <div className={styles.comboboxWrapper}>
            <label htmlFor="combobox">Växttyp*</label>

            {/* ----------  COMBOBOX - SEARCH BY NAME (sv/latin) ---------- */}
            {selectedPlant === null && (
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
            )}

            {/* ----------  COMBOBOX - TEXT INPUT ---------- */}
            <input
              type="text"
              aria-required={true}
              placeholder="t.ex. tomat"
              id="combobox"
              role="combobox"
              aria-controls="combobox-list"
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-expanded={filteredPlants.length > 0}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedPlant(null); // Rensa vald växt vid ny sökning
              }}
            />
            {/* ----------  COMBOBOX - LISTBOX ---------- */}
            <div className={styles.filteredPlants}>
              <ul id="combobox-list">
                {listboxExpanded && (
                  <>
                    {filteredPlants.slice(0, 6).map((p) => (
                      <li key={p.name_sv}>
                        <label>
                          <input
                            type="checkbox"
                            className={`visuallly-hidden`}
                            id={p.name_sv}
                            value={p.name_sv}
                            // checked={selectedPlant?.name_sv === p.name_sv}
                            onChange={() => {
                              setSelectedPlant(p);
                              setSearchTerm(`${p.name_sv}`);
                              setFilteredPlants([]);
                            }}
                          />

                          <strong>{p.name_sv}</strong>
                          <span style={{ color: "#666" }}>
                            ({p.name_latin})
                          </span>

                          {p.alias && p.alias.length > 0 && (
                            <span style={{ fontSize: "0.8rem", color: "#666" }}>
                              alias: {p.alias.join(", ")}
                            </span>
                          )}
                        </label>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          {/* ----------  COMBOBOX - MESSAGES ---------- */}
          {noMatchingSearchResults && (
            <p className={styles.error}>
              Inga växter matchar din sökning: <br />
              {currentSearch}
            </p>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </fieldset>

        {/* ----------  CHECKBOX-SWITCH - ADD TO PLANNING ---------- */}
        <div className={`${styles.checkboxGroup} ${styles.checkboxToggle}`}>
          <label>
            i såplanering
            <ToggleSwitch defaultChecked="true" />
          </label>
        </div>

        {/* ----------  SUBMIT - SAVE PLANT ---------- */}
        <fieldset className={styles.sectionSavePlant}>
          <legend className="visually-hidden">Spara växt</legend>
          <div className={styles.validationMsg}>
            {isValidationError && (
              <p className={styles.error}>
                Fyll i formuläret för att spara växt:
              </p>
            )}
            <ul>
              {validationErrorName && <li>{validationErrorName}</li>}
              {validationErrorPlant && <li>{validationErrorPlant}</li>}
            </ul>
          </div>
          <button type="submit">Spara växt</button>
        </fieldset>
      </form>

      {/* ----------  SAVED PLANTS ---------- */}
      <section className={styles.sectionSaved}>
        {savedPlants.length > 0 && (
          <>
            <h4>Nyligen sparat:</h4>
            <ul>
              {savedPlants.map((sp) => (
                <li key={sp.created}>
                  {`${sp.customName} (${sp.linkedTo.name_sv}) `}
                  <Link href="/vaxtlista">Till {sp.customName} </Link>
                  <Link href={`/vaxtlista#${sp.linkedTo.id}`}>
                    Visa i listan
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
};