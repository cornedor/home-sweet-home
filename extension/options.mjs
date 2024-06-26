/**
 * 
 * @param {string} selector - The selector of the element to get.
 * @returns {HTMLInputElement} - The element with the given selector.
 */
function inputSelector(selector) {
  return document.querySelector(selector);
}

/**
 * Restores the options from storage.
 * @returns {void}
 */
function restoreOptions() {
  browser.storage.local.get().then((result) => {
    inputSelector('#unsplash-access-key').value =
      result.unsplashAccessKey ?? "";
    inputSelector("#unsplash-username").value = result.unsplashUsername ?? "";

    inputSelector('#openweathermap-access-key').value =
      result.openweathermapAccessKey ?? "";
    inputSelector("#latitude").value = result.latitude ?? "";
    inputSelector("#longitude").value = result.longitude ?? "";
    inputSelector("#temperature-unit").value =
      result.temperatureUnit ?? "celsius";
    inputSelector("#wind-unit").value = result.windUnit ?? "kph";
  });
}
document.addEventListener("DOMContentLoaded", restoreOptions);


/**
 * @type {HTMLFormElement} - The form element.
 */
const form = document.querySelector("form")

/**
 * Handles the form submission event.
 * @param {Event} event - The event object.
 * @returns {void}
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  browser.storage.local.set({
    unsplashAccessKey: formData.get("unsplash-access-key"),
    unsplashUsername: formData.get("unsplash-username"),
    openweathermapAccessKey: formData.get("openweathermap-access-key"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  })
});
