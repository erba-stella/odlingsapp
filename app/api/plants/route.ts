import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Plant = {
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
    const onlyCategories = searchParams.get("categories") === "true";

    if (onlyCategories) {
      const uniqueCategories = Array.from(
        new Set(plants.map((p) => p.category))
      ).sort();
      return NextResponse.json(uniqueCategories);
    }

    let filtered = plants;

    if (categoryFilter) {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      const startsWithWord = (text: string) =>
        text
          .toLowerCase()
          .split(/\s+/)
          .some((word) => word.startsWith(query));

      filtered = filtered.filter((p) => {
        const matchName = startsWithWord(p.name_sv || "");
        const matchLatin = startsWithWord(p.name_latin || "");
        const matchAlias = Array.isArray(p.alias)
          ? p.alias.some((alias) => startsWithWord(alias))
          : false;

        return matchName || matchLatin || matchAlias;
      });
    }

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}