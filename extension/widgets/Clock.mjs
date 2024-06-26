import { html } from "htm/preact";
import { useEffect } from "preact/hooks";
import { computed, signal } from "@preact/signals";

import { getWeather } from "../utils/getWeather.mjs";

const formatTime = new Intl.DateTimeFormat(browser.i18n.getUILanguage(), {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const formatDate = new Intl.DateTimeFormat(browser.i18n.getUILanguage(), {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const iconMapping = {
  "11d": "ri-thunderstorms-line",
  "09d": "ri-drizzle-line",
  "10d": "ri-rainy-line",
  "13d": "ri-snowy-line",
  "50d": "ri-mist-line",
  "01d": "ri-sun-line",
  "01n": "ri-moon-line",
  "02d": "ri-sun-cloudy-line",
  "02n": "ri-moon-cloudy-line",
  "03d": "ri-cloudy-line",
  "03n": "ri-cloudy-line",
  "04d": "ri-cloudy-2",
  "04n": "ri-cloudy-2",
};

const weatherDescription = signal("");
const weatherTemp = signal(23);
const weatherIcon = signal("02d");
const weatherAvailable = signal(false);

export function Clock() {
  const time = signal(formatTime.format(new Date()));

  useEffect(() => {
    setInterval(() => {
      time.value = formatTime.format(new Date());
    }, 1000);

    getWeather().then((data) => {
      if (!data) {
        return;
      }
      weatherDescription.value = data.current.weather[0]?.description;
      weatherTemp.value = Math.round(data.current.temp);
      weatherIcon.value = data.current.weather[0]?.icon;
      weatherAvailable.value = true;
    });
  }, []);

  const icon = computed(() => iconMapping[weatherIcon] ?? weatherIcon);

  return html`
    <div class="font-berkely-mono text-white text-center mt-40 relative">
      <div
        class="bg-cararra-950/20 rounded-[50%] absolute top-0 left-0 w-full h-full scale-125 blur-3xl"
      ></div>
      <div class="z-10 relative text-[150px] mb-0">${time}</div>
      ${weatherAvailable
      ? html`<div
            class="z-10 relative text-2xl -mt-10 flex justify-between w-full px-2"
          >
            <span>${formatDate.format(new Date())}</span>
            <span><i class=${icon}></i> ${weatherTemp}°C</span>
          </div>`
      : null}
    </div>
  `;
}
