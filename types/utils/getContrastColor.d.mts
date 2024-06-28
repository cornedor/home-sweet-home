/**
 * Gets the contrast color of a given color
 * @param {string} color - The color to get the contrast color of
 * @returns {"dark" | "light"} The contrast color of the given color
 */
export function getContrastColor(color: string): "dark" | "light";
/**
 * Gets the contrast color of a given RGB value
 * @param {number} r - The red value
 * @param {number} g - The green value
 * @param {number} b - The blue value
 * @returns {"dark" | "light"} The contrast color of the given color
 */
export function getContrastRGB(r: number, g: number, b: number): "dark" | "light";
