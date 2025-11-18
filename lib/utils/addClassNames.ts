export default function cn(
  ...classes: (
    | string
    | false
    | null
    | undefined
    | (string | false | null | undefined)[]
  )[]
): string {
  return classes
    .flat()
    .filter((x) => x !== null && x !== undefined && x !== false && x !== "")
    .join(" ");
}

/**
 * ref:
 * https://dev.to/seasonedcc/replace-clsx-classnames-or-classcat-with-your-own-little-helper-3bf
 * 
 * */