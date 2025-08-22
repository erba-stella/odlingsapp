import { NextResponse } from 'next/server';
import { PlantData } from '@/lib/interfaces';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'plantdata.json');
    const file = fs.readFileSync(filePath, 'utf-8');
    const plants: PlantData[] = JSON.parse(file);

    const uniqueTags = Array.from(
      new Set(plants.flatMap(p => p.tags || []))
    ).sort((a, b) =>
      a.localeCompare(b, 'sv', { sensitivity: 'base' })
    );

      return NextResponse.json(uniqueTags);
      
  } catch (error) {
    console.error('API /plants/tags error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}