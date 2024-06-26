import { signal } from "@preact/signals";
import { decode } from "blurhash";

/**
 * @typedef PhotoData
 * @type {object}
 * @property {string} url - The URL of the photo
 * @property {string} width - The width of the photo
 * @property {string} height - The height of the photo
 * @property {string} link - The link to the photo
 * @property {string} userName - The name of the user who uploaded the photo
 * @property {string} blurHash - The blurhash of the photo
 * @property {string} color - The color of the photo
 * @property {number} expires - The expiration time of the photo
 */

/**
 * @param {PhotoData} data
 * @return {string} Cached photo data
 */
function encodeCachedPhotoData(data) {
  return JSON.stringify(data);
}

/**
 * @param {string} data
 * @return {PhotoData} Decoded photo data
 */
function decodeCachedPhotoData(data) {
  return JSON.parse(data);
}

/**
 * @type {import('@preact/signals').Signal<PhotoData|null>}
 */
export const currentPhotoInfoSignal = signal(null);

/**
 * Fits a given width and height to a container width and height while maintaining the aspect ratio.
 * @param {number} widthToFit
 * @param {number} heightToFit
 * @param {number} containerWidth
 * @param {number} containerHeight
 * @returns {{width: number, height: number}} An object containing the fitted width and height
 */
function fitDimension2D(
  widthToFit,
  heightToFit,
  containerWidth,
  containerHeight,
) {
  let ratio = Math.min(
    containerWidth / widthToFit,
    containerHeight / heightToFit,
  );
  return {
    width: Math.round(widthToFit * ratio),
    height: Math.round(heightToFit * ratio),
  };
}

/**
 * @param {string} hash - The blurhash to update the background with
 * @param {number} photoWidth - The width of the photo
 * @param {number} photoHeight - The height of the photo
 * @returns {void} Returns void
 */
function updateBlurHash(hash, photoWidth, photoHeight, url) {
  if (!hash || hash.length <= 6) {
    return;
  }
  /**
   * @type {HTMLCanvasElement} canvas - The canvas element used to draw the blurhash
   */
  const canvas = document.createElement("canvas");
  canvas.className = "fixed top-0 left-0 w-full h-full object-cover -z-10";
  const { width, height } = fitDimension2D(photoWidth, photoHeight, 256, 256);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const pixels = decode(hash, width, height);
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);
  document.body.appendChild(canvas);

  const image = new Image();
  image.src = url;
  image.onload = () => {
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 200);
  };
}

/**
 * @param {boolean} force - Whether to force a new photo even if one is cached
 * @returns {Promise<PhotoData|null>} A promise that resolves to a random photo data or null if there is no photo
 */
export async function getRandomPhoto(force) {
  const storage = await browser.storage.local.get();
  const cachedPhotoData = storage.randomPhoto;
  /**
   * @types {string|undefined}
   */
  const accessKey = storage.unsplashAccessKey;
  if (cachedPhotoData && !force) {
    const data = decodeCachedPhotoData(cachedPhotoData);
    if (data.expires > Date.now()) {
      updateBlurHash(
        data.blurHash,
        Number(data.width),
        Number(data.height),
        data.url,
      );
      currentPhotoInfoSignal.value = data;
      return data;
    }
  }

  const url = new URL("https://api.unsplash.com/photos/random");
  url.searchParams.append("orientation", "landscape");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  }).then((response) => response.json());

  if (response.urls.regular) {
    /**
     * @type {PhotoData}
     */
    const data = {
      // New photo every hour
      expires: Date.now() + 1000 * 60 * 60,
      url: response.urls.full.replace("&fm=jpg", "&fm=avif") + "&w=2600",
      width: response.width,
      height: response.height,
      userName: response.user.name,
      link: response.links.html,
      blurHash: response.blur_hash,
      color: response.color,
    };
    browser.storage.local.set({
      randomPhoto: encodeCachedPhotoData(data)
    })
    updateBlurHash(data.blurHash, Number(data.width), Number(data.height));
    currentPhotoInfoSignal.value = data;
    return data;
  }

  currentPhotoInfoSignal.value = null;

  return null;
}

/**
 *
 * @param {HTMLElement} element
 * @param {boolean} [force] - Whether to force a new photo even if one is cached
 */
export function applyRandomPhoto(element, force = false) {
  getRandomPhoto(force).then((data) => {
    if (data) {
      element.style.backgroundImage = `url(${data.url})`;
    }
  });
}

/**
 * Extends the expiration time of the cached photo data by 7 days
 * @returns {void} Returns void
 */
export function extendTime() {
  const stored = localStorage.getItem("randomPhoto");
  if (stored) {
    const data = decodeCachedPhotoData(stored);
    // Set data expires to 7 days from now
    data.expires = Date.now() + 1000 * 60 * 60 * 24 * 7;
    localStorage.setItem("randomPhoto", encodeCachedPhotoData(data));
  }
}

/**
 * Gets the current photo info from the cache
 * @returns {PhotoData|null} The photo info or null if there is no photo
 */
export function getCurrentPhotoInfo() {
  const stored = localStorage.getItem("randomPhoto");
  if (stored) {
    return decodeCachedPhotoData(stored);
  }
  return null;
}
