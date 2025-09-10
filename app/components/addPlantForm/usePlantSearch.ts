import { useEffect, useState } from "react";
import { fetchPlantData } from "@/data-access/fetch-data";
import { PlantData } from "@/lib/interfaces";

export const usePlantSearch = (
  searchTerm: string,
  searchSwedish: boolean,
  searchLatin: boolean
) => {
  const [filteredPlants, setFilteredPlants] = useState<PlantData[]>([]);
  const [error, setError] = useState<string | null>(null);

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
        setError(null);
      } catch (err) {
        setError(
          "Tyvärr går det inte att hämta växttyper just nu. Försök gärna senare."
        );
        console.error("Error: Fetch filtered plants:", err);
      }
    };

    loadData();
  }, [searchTerm, searchSwedish, searchLatin]);

  return { filteredPlants, error };
};