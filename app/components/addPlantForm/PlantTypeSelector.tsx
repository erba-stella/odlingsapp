import { useState } from "react";
import styles from "./plantForm.module.css";
import { PlantData } from "@/lib/interfaces";
import { usePlantSearch } from "./usePlantSearch";

interface Props {
  selectedPlant: PlantData | null;
  onSelect: (plant: PlantData | null) => void;
}

export const PlantTypeSelector = ({ selectedPlant, onSelect }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSwedish, setSearchSwedish] = useState(true);
  const [searchLatin, setSearchLatin] = useState(false);

  const { filteredPlants, error } = usePlantSearch(
    searchTerm,
    searchSwedish,
    searchLatin
  );

  const listboxExpanded =
    filteredPlants.length > 0 && searchTerm !== "" && selectedPlant === null;
  const noMatchingSearchResults =
    filteredPlants.length === 0 &&
    !error &&
    !selectedPlant &&
    searchTerm.length > 0;

  const currentSearch = `${
    searchSwedish && !searchLatin
      ? "svenska namn "
      : !searchSwedish && searchLatin
      ? "latinska namn "
      : "namn "
  } som börjar på "${searchTerm}"`;

  return (
    <fieldset>
      <legend className="visually-hidden">Ange typ av växt</legend>
      <div className={styles.comboboxWrapper}>
        <label htmlFor="combobox">Växttyp*</label>

        {/* filter toggles */}
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

        {/* search input */}
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
            onSelect(null);
          }}
        />

        {/* listbox */}
        <div className={styles.filteredPlants}>
          <ul id="combobox-list">
            {listboxExpanded &&
              filteredPlants.slice(0, 6).map((p) => (
                <li key={p.name_sv}>
                  <label>
                    <input
                      type="checkbox"
                      className="visually-hidden"
                      id={p.name_sv}
                      value={p.name_sv}
                      onChange={() => {
                        onSelect(p);
                        setSearchTerm(p.name_sv);
                      }}
                    />
                    <strong>{p.name_sv}</strong>{" "}
                    <span style={{ color: "#666" }}>({p.name_latin})</span>
                    {p.alias?.length > 0 && (
                      <span style={{ fontSize: "0.8rem", color: "#666" }}>
                        alias: {p.alias.join(", ")}
                      </span>
                    )}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* messages */}
      {noMatchingSearchResults && (
        <p className={styles.error}>
          Inga växter matchar din sökning: <br />
          {currentSearch}
        </p>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </fieldset>
  );
};