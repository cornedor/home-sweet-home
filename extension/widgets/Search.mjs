import { computed, signal } from "@preact/signals";
import { html } from "htm/preact";

const { i18n } = browser

const searchName = signal("");
/**
 * @type {import('@preact/signals').Signal<string | null>}
 */
const searchIcon = signal(null);

if (typeof browser !== "undefined") {
  searchName.value =
    (await browser.search.get()).find((item) => item.isDefault)?.name ?? "";
  searchIcon.value =
    (await browser.search.get()).find((item) => item.isDefault)?.favIconUrl ??
    null;
}

export function Search() {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    browser.search.query({
      text: formData.get("search")?.toString() ?? "",
    });
  };

  const placeholder = computed(() => i18n.getMessage("searchWith", searchName.value))

  return html`
    <form onSubmit=${onSubmit} class="w-[560px] p-2">
      <label
        class="flex items-center gap-4 bg-cararra-50/30 backdrop-blur backdrop-saturate-150 rounded-lg text-cararra-900 focus-within:ring-2"
      >
        <img src=${searchIcon} class="w-6 h-6 ms-2" />
        <input
          type="text"
          placeholder=${placeholder}
          name="search"
          class="w-full py-4 bg-transparent focus:outline-none placeholder:text-cararra-900 placeholder:opacity-100"
        />
        <button class="p-4 hover:bg-cararra-50/20 rounded-e-lg">
          <i class="ri-search-line"></i>
        </button>
      </label>
    </form>
  `;
}
