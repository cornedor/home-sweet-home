import { render } from "preact";
import { html } from "htm/preact";
import { computed } from "@preact/signals";

import { applyRandomPhoto } from "./utils/getRandomPhoto.mjs";
import { Clock } from "./widgets/Clock.mjs";
import { Footer } from "./widgets/Footer.mjs";
import { TopSites } from "./widgets/TopSites.mjs";
import { Search } from "./widgets/Search.mjs";
import { showWidgets } from "./utils/showWidgets.mjs";
import { BrowserLogo } from "./widgets/BrowserLogo.mjs";

document.dir = browser.i18n.getMessage("@@bidi_dir")

/**
 * The main app component that renders the base layout of the extension.
 * @returns {import("preact").VNode} - The main app component
 */
function App() {
  const showWidgetsClass = computed(() => {
    return showWidgets.value ? "" : "opacity-0 scale-105";
  });

  return html`
    <div class="overflow-hidden h-full">
      <img class="fixed top-0 left-0 w-full h-full object-cover pointer-events-none" id="background" crossOrigin="anonymous" />
      <div
        class="flex items-center justify-center flex-col gap-16 transition-all ${showWidgetsClass}"
      >
        <${Clock} />
        <${Search} />
        <${TopSites} />
      </div>
      <${BrowserLogo} />
      <${Footer} />
    </div>
  `;
}

render(html`<${App} />`, document.body);

const backgroundImage = document.getElementById("background")
if (backgroundImage instanceof HTMLImageElement) {
  applyRandomPhoto(backgroundImage);
}
