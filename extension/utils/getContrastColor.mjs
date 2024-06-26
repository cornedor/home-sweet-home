/**
 * Gets the contrast color of a given color
 * @param {string} color - The color to get the contrast color of
 * @returns {"dark" | "light"} The contrast color of the given color
 */
export function getContrastColor(color) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "dark" : "light";
}
