import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Plant = {
  id: string;
  name_sv: string;
  name_latin: string;
  alias: string[];
  category: string;
  start_seeds_indoors?: { min: number; max: number };
  plant_seedlings_outdors?: { min: number; max: number };
  start_seeds_outdoors?: { min: number; max: number };
};

function readPlantData(): Plant[] {
  const filePath = path.join(process.cwd(), "data", "plantdata.json");
  const file = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(file);
}

export async function GET(req: NextRequest) {
  try {
    const plants = readPlantData();

    const { searchParams } = new URL(req.url);
    const categoryFilter = searchParams.get("category");
    const searchQuery = searchParams.get("search");
    const lang = searchParams.get("lang");

    let result = plants;

    // Filter by category
    if (categoryFilter) {
      result = result.filter(
        (plant) =>
          plant.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Search plant by name (name_sv, name_latin or alias)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      result = result.filter((plant) => {
        const matchSwedish =
          lang === "sv" || !lang
            ? plant.name_sv.toLowerCase().startsWith(query) ||
              plant.alias?.some((alias) =>
                alias.toLowerCase().startsWith(query)
              )
            : false;

        const matchLatin =
          lang === "latin" || !lang
            ? plant.name_latin.toLowerCase().startsWith(query)
            : false;

        return matchSwedish || matchLatin;
      });
    }

    // Sort result by name_sv (A–Ö)
    result.sort((a, b) =>
      (a.name_sv || "").localeCompare(b.name_sv || "", "sv", {
        sensitivity: "base",
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("API / plants error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
