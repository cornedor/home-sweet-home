import { FastAverageColor } from 'fast-average-color'
import { getContrastRGB } from './getContrastColor.mjs';

const logoWidth = 180;
const logoHeight = 64;
const logoOffsetY = 16;
const logoOffsetX = 32;

/**
 * Get the (luma) histogram of an image data.
 * @param {Uint8ClampedArray} data 
 */
function getHistorgram(data) {
  let histogram = new Array(256).fill(0);

  // Compute the histogram
  for (let i = 0; i < data.length; i += 4) {
    // Convert RGB to luma using the formula: 0.299*R + 0.587*G + 0.114*B
    let luma = Math.floor(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    histogram[luma]++;
  }

  return histogram
}

/**
 * @param {number} totalPixels 
 * @param {number[]} histogram
 */
function getUniformityIndex(totalPixels, histogram) {
  let uniformityIndex2 = 0;
  for (let i = 0; i < histogram.length; i++) {
    const normalized = (histogram[i] / totalPixels)
    uniformityIndex2 = uniformityIndex2 + (normalized * normalized);
  }

  return uniformityIndex2
}

/**
 * Fit the width and height in maxWidth/Height covering the whole soze.
 * @param {number} width  - The width of the cover
 * @param {number} height - The height of the cover
 * @param {number} maxWidth - The maximum width of the cover
 * @param {number} maxHeight - The maximum height of the cover
 * @returns {{width: number, height: number}} - The width and height
 */
function getCoverSize(width, height, maxWidth, maxHeight) {
  const ratio = Math.max(maxWidth / width, maxHeight / height);
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

/**
 * Renders the background of the two possible logo positions, and finds the most suitable one.
 * @param {string} url - The background image URL
 * @returns {Promise<{position: 1 | 2, color: 'dark' | 'light'}>} - An object containing the position of the logo and the color of the logo
 */
export async function getLogoPlacement(url) {
  const image = new Image();
  image.src = url;
  image.crossOrigin = "anonymous";
  await new Promise(resolve => image.onload = resolve);

  /**
   * @type {HTMLElement} background - The background element
  */
  const background = document.getElementById("background");
  const { width: backgroundWidth, height: backgroundHeight } = background.getBoundingClientRect()

  // A canvas roughly the size of the logo
  const canvas = document.createElement("canvas");
  canvas.width = logoWidth
  canvas.height = logoHeight
  const ctx = canvas.getContext("2d");

  const imageWidth = image.naturalWidth
  const imageHeight = image.naturalHeight

  // Position the image so it is aligned with the cover background
  const coverSize = getCoverSize(imageWidth, imageHeight, backgroundWidth, backgroundHeight)
  const x = Math.round((backgroundWidth - coverSize.width) / 2)
  const y = Math.round((backgroundHeight - coverSize.height) / 2)
  const totalPixels = canvas.width * canvas.height;

  // Draw the image on the canvas and get the image data
  ctx.drawImage(image, x - logoOffsetX, y - logoOffsetY, coverSize.width, coverSize.height);
  const imageData1 = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, -((coverSize.width - logoWidth) - logoOffsetX + x), y - logoOffsetY, coverSize.width, coverSize.height);
  const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Get the uniformity index of both canvases, and get the most uniform position
  const uniformityIndex1 = getUniformityIndex(totalPixels, getHistorgram(imageData1.data));
  const uniformityIndex2 = getUniformityIndex(totalPixels, getHistorgram(imageData2.data));
  const mostUniformPosition = uniformityIndex1 > uniformityIndex2 ? 1 : 2;

  const fastAverageColor = new FastAverageColor();
  const color = fastAverageColor.getColorFromArray4(mostUniformPosition === 1 ? imageData1.data : imageData2.data)
  fastAverageColor.destroy()
  const contrast = getContrastRGB(color[0], color[1], color[2])

  return {
    position: mostUniformPosition,
    color: contrast,
  }
}
