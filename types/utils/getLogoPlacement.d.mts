/**
 * Renders the background of the two possible logo positions, and finds the most suitable one.
 * @param {string} url - The background image URL
 * @returns {Promise<{position: 1 | 2, color: 'dark' | 'light'}>} - An object containing the position of the logo and the color of the logo
 */
export function getLogoPlacement(url: string): Promise<{
    position: 1 | 2;
    color: "dark" | "light";
}>;
