import { signal } from "@preact/signals";
import { html } from "htm/preact";

/**
 * @type {import('@preact/signals').Signal<browser.topSites.MostVisitedURL[]>}
 */
const topSites = signal([]);

if (typeof browser !== "undefined" && browser.topSites != null) {
  topSites.value = await browser.topSites.get({
    includeFavicon: true,
    newtab: true,
  });
}

/**
 * Grid of top sites from the browser.topSites API.
 * @returns {import('preact').VNode} - The top sites grid
 */
export function TopSites() {
  // There is a bug in the topSites API that the Array contains holes
  return html`
    <div class="grid grid-cols-6 gap-4">
      ${topSites.value
      .filter((site) => site?.url != null)
      .map(
        (site) => html`
            <a
              href=${site.url}
              class="group flex items-center flex-col transition-transform hover:scale-110 active:scale-90 gap-1"
            >
              <div
                class="flex items-center gap-2 bg-cararra-50/20 backdrop-blur backdrop-saturate-150 p-4 rounded-lg transition-colors group-hover:bg-cararra-50/40"
              >
                <img src=${site.favicon} class="w-8 h-8" />
              </div>
              <div class="flex-1 text-white text-shadow-sm shadow-black">
                <div class="font-semibol w-20 truncate text-center text-xs">
                  ${site.title?.split(/[\-·|:]/)[0] ?? null}
                </div>
              </div>
            </a>
          `,
      )}
    </div>
  `;
}
