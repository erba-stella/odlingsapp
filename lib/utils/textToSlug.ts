/*
- Convert to lowercase
- Normalize the string to a common form
- Remove diacritical marks (eg ä → a, å → a, é → e)
- Replace spaces and other non-alphanumeric characters with hyphens
- Remove leading and trailing hyphens
*/

export const slug = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9]+/g, "-"); 
}