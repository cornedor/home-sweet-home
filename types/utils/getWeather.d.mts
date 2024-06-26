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
export function getWeather(force?: boolean): Promise<WeatherDataResponse>;
/**
 * - The weather data
 */
export type WeatherData = {
    /**
     * - The id of the weather
     */
    id: number;
    /**
     * - The main of the weather
     */
    main: string;
    /**
     * - The description of the weather
     */
    description: string;
    /**
     * - The icon of the weather
     */
    icon: string;
};
export type CurrentWeatherData = {
    /**
     * - The date and time of the weather
     */
    dt: number;
    /**
     * - The sunrise time of the weather
     */
    sunrise: number;
    /**
     * - The sunset time of the weather
     */
    sunset: number;
    /**
     * - The temperature of the weather
     */
    temp: number;
    /**
     * - The feels like temperature of the weather
     */
    feels_like: number;
    /**
     * - The pressure of the weather
     */
    pressure: number;
    /**
     * - The humidity of the weather
     */
    humidity: number;
    /**
     * - The dew point of the weather
     */
    dew_point: number;
    /**
     * - The UV index of the weather
     */
    uvi: number;
    /**
     * - The cloudiness of the weather
     */
    clouds: number;
    /**
     * - The visibility of the weather
     */
    visibility: number;
    /**
     * - The wind speed of the weather
     */
    wind_speed: number;
    /**
     * - The wind direction of the weather
     */
    wind_deg: number;
    /**
     * - The wind gust of the weather
     */
    wind_gust: number;
    /**
     * - The weather data of the weather
     */
    weather: WeatherData[];
};
export type MinutelyWeatherData = {
    /**
     * - The date and time of the minutely weather
     */
    dt: number;
    /**
     * - The precipitation of the minutely weather
     */
    precipitation: number;
};
export type WeatherAlert = {
    /**
     * - The sender name of the weather alert
     */
    sender_name: string;
    /**
     * - The event of the weather alert
     */
    event: string;
    /**
     * - The start time of the weather alert
     */
    start: number;
    /**
     * - The end time of the weather alert
     */
    end: number;
    /**
     * - The description of the weather alert
     */
    description: string;
    /**
     * - The tags of the weather alert
     */
    tags: string[];
};
export type WeatherDataResponse = {
    /**
     * - The latitude of the weather
     */
    lat: number;
    /**
     * - The longitude of the weather
     */
    lon: number;
    /**
     * - The timezone of the weather
     */
    timezone: string;
    /**
     * - The timezone offset of the weather
     */
    timezone_offset: number;
    /**
     * - The current weather data
     */
    current: CurrentWeatherData;
    /**
     * - The minutely weather data
     */
    minutely: MinutelyWeatherData[];
    /**
     * - The alerts of the weather
     */
    alerts: WeatherAlert[];
};
