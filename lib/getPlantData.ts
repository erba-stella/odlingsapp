import fs from 'fs';
import path from 'path';

export async function getPlantCategories() {
  const filePath = path.join(process.cwd(), 'app', 'plantdata-json', 'categories.json');
  const fileContents = await fs.promises.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileContents);
  return data;
}