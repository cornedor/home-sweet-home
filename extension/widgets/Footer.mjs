import { html } from "htm/preact";
import {
  applyRandomPhoto,
  currentPhotoInfoSignal,
  extendTime,
} from "../utils/getRandomPhoto.mjs";
import { showWidgets } from "../utils/showWidgets.mjs";
import { computed } from "@preact/signals";

const { i18n } = browser;

/**
 * Footer bar that controls small settings for the extension.
 * @returns {import('preact').VNode}
 */
export function Footer() {
  const link = computed(() => currentPhotoInfoSignal.value?.link ?? null);
  const userName = computed(
    () => currentPhotoInfoSignal.value?.userName ?? null,
  );

  return html`
    <footer
      class="fixed rounded-t opacity-100 bottom-0 left-0 right-0 bg-cararra-950/40 border-t-cararra-300/50 border-t text-white text-sm hover:opacity-100 px-8 py-2 gap-4 flex backdrop-blur-sm backdrop-saturate-150"
    >
      <button
        class="flex gap-1"
        onClick=${() => {
      const backgroundImage = document.getElementById("background")
      if (backgroundImage instanceof HTMLImageElement) {
        applyRandomPhoto(backgroundImage, true);
      }
    }}
      >
      <i class="ri-unsplash-fill"></i> ${i18n.getMessage("newBackground")}
      </button >
      <button class="flex gap-1" onClick=${() => extendTime()}>
        <i class="ri-timer-flash-line"></i> ${i18n.getMessage("extendTime")}
      </button>
      <button
        class="flex gap-1"
        onClick=${() => (showWidgets.value = !showWidgets.peek())}
      >
        <i class=${showWidgets.value ? "ri-eye-close-line" : "ri-eye-line"}></i>
        ${showWidgets.value
      ? i18n.getMessage("hideWidgets")
      : i18n.getMessage("showWidgets")}
      </button>
      <div class="flex-1"></div>
      ${userName ? html`<a href=${link}>${userName}</a>` : null}
    </footer >
    `;
}
