import { computed, signal } from "@preact/signals";
import { html } from "htm/preact";
import { currentPhotoInfoSignal } from "../utils/getRandomPhoto.mjs";
import { getContrastColor } from "../utils/getContrastColor.mjs";

const browserName = signal("")
browser.runtime.getBrowserInfo().then(info => browserName.value = info.name)

export function BrowserLogo() {
  const logoColorClass = computed(() => {
    if (!currentPhotoInfoSignal.value) {
      return "fill-cararra-50";
    }
    const contrast = getContrastColor(currentPhotoInfoSignal.value.color);
    if (contrast === "dark") {
      return "fill-cararra-950";
    }
    return "fill-cararra-50";
  });

  return html`
    <div class="gap-3 flex fixed top-4 end-8">
      <img
        src="chrome://branding/content/about-logo.png"
        alt=${browserName}
        class="w-16 h-16 "
      />
      <img
        src="chrome://branding/content/firefox-wordmark.svg"
        alt=""
        class="h-16 w-[105px] object-contain ${logoColorClass} moz-context-fill"
      />
    </div>
  `;
}
