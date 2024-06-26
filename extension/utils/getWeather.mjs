/**
 * @typedef {object} WeatherData - The weather data
 * @property {number} id - The id of the weather
 * @property {string} main - The main of the weather
 * @property {string} description - The description of the weather
 * @property {string} icon - The icon of the weather
 */

/**
 * @typedef {object} CurrentWeatherData
 * @property {number} dt - The date and time of the weather
 * @property {number} sunrise - The sunrise time of the weather
 * @property {number} sunset - The sunset time of the weather
 * @property {number} temp - The temperature of the weather
 * @property {number} feels_like - The feels like temperature of the weather
 * @property {number} pressure - The pressure of the weather
 * @property {number} humidity - The humidity of the weather
 * @property {number} dew_point - The dew point of the weather
 * @property {number} uvi - The UV index of the weather
 * @property {number} clouds - The cloudiness of the weather
 * @property {number} visibility - The visibility of the weather
 * @property {number} wind_speed - The wind speed of the weather
 * @property {number} wind_deg - The wind direction of the weather
 * @property {number} wind_gust - The wind gust of the weather
 * @property {WeatherData[]} weather - The weather data of the weather
 */

/**
 * @typedef {object} MinutelyWeatherData
 * @property {number} dt - The date and time of the minutely weather
 * @property {number} precipitation - The precipitation of the minutely weather
 */

/**
 * @typedef {object} WeatherAlert
 * @property {string} sender_name - The sender name of the weather alert
 * @property {string} event - The event of the weather alert
 * @property {number} start - The start time of the weather alert
 * @property {number} end - The end time of the weather alert
 * @property {string} description - The description of the weather alert
 * @property {string[]} tags - The tags of the weather alert
 */

/**
 * @typedef {object} WeatherDataResponse
 * @property {number} lat - The latitude of the weather
 * @property {number} lon - The longitude of the weather
 * @property {string} timezone - The timezone of the weather
 * @property {number} timezone_offset - The timezone offset of the weather
 * @property {CurrentWeatherData} current - The current weather data
 * @property {MinutelyWeatherData[]} minutely - The minutely weather data
 * @property {WeatherAlert[]} alerts - The alerts of the weather
 */

/**
 * Fetches the current weather from OpenWeatherMap
 * @param {boolean} [force] - Whether to force a new weather even if one is cached
 * @returns {Promise<WeatherDataResponse>} A promise that resolves to the current weather data
 */
export async function getWeather(force) {
  const storage = await browser.storage.local.get();
  const cachedWeatherData = storage.weather;
  if (cachedWeatherData?.current && !force) {
    /**
     * @type {WeatherDataResponse}
     */
    // If the weather data is older than 5 minutes, update it

    if (cachedWeatherData.current.dt > (Date.now() - 1000 * 60 * 5) / 1000) {
      return cachedWeatherData;
    }
  }

  const url = new URL("https://api.openweathermap.org/data/3.0/onecall");
  /**
   * @type {string} - The access key for OpenWeatherMap
   */
  const accessKey = storage.openweathermapAccessKey;
  /**
   * @type {string} - Latitude of the requested location
   */
  const latitude = storage.latitude;
  /**
   * @type {string} - Longitude of the requested location
   */
  const longitude = storage.longitude;

  if (!accessKey || !longitude || !latitude) {
    return null;
  }

  url.searchParams.set("appid", accessKey);
  url.searchParams.set("lat", latitude);
  url.searchParams.set("lon", longitude);
  url.searchParams.set("exclude", "minutely,hourly,daily");
  url.searchParams.set("units", "metric");

  const response = await fetch(url).then((response) => response.json());
  browser.storage.local.set({
    weather: response
  })
  return response;
}
