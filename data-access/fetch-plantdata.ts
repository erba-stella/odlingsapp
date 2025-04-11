'use server';
const API_ENDPOINT = "/api/plants"

/*

/api/plants?categories=true	      Returnerar en lista med unika kategorier
/api/plants?category=Kryddväxter	Returnerar alla växter i vald kategori
/api/plants?search=basi             Returnerar växter vars namn börjar på söksträngen (svenska och latiska namn + aliases)

*/

export const fetchPlantData = async ( str: string ) => {
      const res = await fetch(`${API_ENDPOINT}${str}`);
      if (!res.ok) {
            throw new Error(`Error HTTP status ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      return data;
};

export const fetchPlantCategories = async () => {
      return await fetchPlantData(`?categories=true`);
}

/* Typa detta?:
[
  "Asiatiska kålsorter",
  "Baljväxter",
  "Bladgrönsaker",
  "Gurkväxter",
  "Kryddväxter",
  "Kålväxter",
  "Lökväxter",
  "Rotgrönsaker",
  "Rotknölar",
  "Squash",
  "Tomat, Paprika & Chilli",
  "Övrigt"
]
*/

export const fetchPlantsInCategory = async ( category: string ) => {
      return await fetchPlantData(`?category=${category}`);
}

// export const fetchPlantsSortedByCategory = async () => {
//       const categories = await fetchPlantData(`?categories=true`);
      
// }