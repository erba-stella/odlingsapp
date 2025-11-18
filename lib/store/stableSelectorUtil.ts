/* ============================================================
   Util for stable selectors
    - Selector functions should preferably be defined outside the hook,
      to avoid unnecessary rerenders and weirdness
*/

export function select<T, S>(fn: (data: T) => S) {
  return fn;
}