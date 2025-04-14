import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Plant = {
  category?: string;
};

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'plantdata.json');
    const file = fs.readFileSync(filePath, 'utf-8');
    const plants: Plant[] = JSON.parse(file);

    const uniqueCategories = Array.from(
      new Set(plants.map(p => p.category).filter(Boolean))
    ).sort((a, b) =>
      a!.localeCompare(b!, 'sv', { sensitivity: 'base' })
    );

      return NextResponse.json(uniqueCategories);
      
  } catch (error) {
    console.error('API /plants/categories error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}