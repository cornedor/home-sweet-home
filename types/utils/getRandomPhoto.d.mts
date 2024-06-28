/**
 * @param {boolean} force - Whether to force a new photo even if one is cached
 * @returns {Promise<PhotoData|null>} A promise that resolves to a random photo data or null if there is no photo
 */
export function getRandomPhoto(force: boolean): Promise<PhotoData | null>;
/**
 *
 * @param {HTMLImageElement} element
 * @param {boolean} [force] - Whether to force a new photo even if one is cached
 */
export function applyRandomPhoto(element: HTMLImageElement, force?: boolean): void;
/**
 * Extends the expiration time of the cached photo data by 7 days
 * @returns {void} Returns void
 */
export function extendTime(): void;
/**
 * Gets the current photo info from the cache
 * @returns {PhotoData|null} The photo info or null if there is no photo
 */
export function getCurrentPhotoInfo(): PhotoData | null;
/**
 * @type {import('@preact/signals').Signal<PhotoData|null>}
 */
export const currentPhotoInfoSignal: import("@preact/signals").Signal<PhotoData | null>;
export type PhotoData = {
    /**
     * - The URL of the photo
     */
    url: string;
    /**
     * - The width of the photo
     */
    width: string;
    /**
     * - The height of the photo
     */
    height: string;
    /**
     * - The link to the photo
     */
    link: string;
    /**
     * - The name of the user who uploaded the photo
     */
    userName: string;
    /**
     * - The blurhash of the photo
     */
    blurHash: string;
    /**
     * - The color of the photo
     */
    color: string;
    /**
     * - The expiration time of the photo
     */
    expires: number;
};
