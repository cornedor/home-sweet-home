import { computed, effect, signal } from "@preact/signals";
import { html } from "htm/preact";
import { useEffect } from "preact/hooks";
import { getLogoPlacement } from "../utils/getLogoPlacement.mjs";
import { getContrastRGB } from "../utils/getContrastColor.mjs";
import { currentPhotoInfoSignal } from "../utils/getRandomPhoto.mjs";

const browserName = signal("")
const position = signal("")
const logoColorClass = signal("fill-red-500")
browser.runtime.getBrowserInfo().then(info => browserName.value = info.name)

/**
 * Renders the browser logo
 * @returns {import('preact').VNode} - The browser logo component
 */
export function BrowserLogo() {
  effect(() => {
    const url = currentPhotoInfoSignal.value?.url
    if (!url) { return }

    getLogoPlacement(url).then(placement => {
      position.value = placement.position === 2 ? "end-8" : "start-8"

      logoColorClass.value = placement.color === 'dark' ? "fill-cararra-950" : "fill-cararra-50"
    });
  })


  useEffect(() => {
    window.addEventListener("resize", () => {
      getLogoPlacement(currentPhotoInfoSignal.value?.url).then(placement => {
        position.value = placement.position === 2 ? "end-8" : "start-8"

        logoColorClass.value = placement.color === 'dark' ? "fill-cararra-950" : "fill-cararra-50"
      });
    }, { passive: true });
  }, [])

  const opacity = computed(() => position.value === "" ? "opacity-0" : "opacity-100")

  return html`
    <div class="gap-3 flex fixed top-4 ${position} ${opacity}">
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
