import { useRef } from "react";

export const useDebounce = () => {
 const timerRef = useRef<NodeJS.Timeout | null>(null);
 
 return (callback: () => void, time: number = 1000) => {
   if (timerRef.current) clearTimeout(timerRef.current);
   timerRef.current = setTimeout(() => {
     callback();
   }, time);
 }; 
};


// function debounce(func, timeout = 300) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, timeout);
//   };
// }