/**
 * Web component for filtering and sorting podcasts.
 *
 * Features:
 * - Filter by genre (1–5, plus "All").
 * - Sort by Recently Updated, Most Popular, or Newest.
 *
 * Dependencies:
 * - Expects `window.podcasts` (array of podcast objects).
 * - Expects `window.renderPodcasts` (function to render filtered list).
 *
 * Podcast object shape:
 * {
 *   id: string,
 *   title: string,
 *   genres: number[],
 *   lastUpdated: string (ISO date),
 *   popularity: number,
 *   releaseDate: string (ISO date),
 *   ...other props
 * }
 */
class GenreFilter extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		/** @type {HTMLDivElement} Wrapper for the dropdowns */
		const wrapper = document.createElement("div");
		wrapper.style.display = "flex";
		wrapper.style.gap = "1rem";
		wrapper.style.marginBottom = "1rem";

		/**
		 * Genre dropdown
		 * @type {HTMLSelectElement}
		 */
		const genreSelect = document.createElement("select");
		genreSelect.innerHTML = `
        <option value="all">All Genres</option>
        ${[1, 2, 3, 4, 5]
					.map((id) => `<option value="${id}">Genre ${id}</option>`)
					.join("")}
      `;

		/**
		 * Sort dropdown
		 * @type {HTMLSelectElement}
		 */
		const sortSelect = document.createElement("select");
		sortSelect.innerHTML = `
        <option value="lastUpdate">Recently Updated</option>
        <option value="popular">Most Popular</option>
        <option value="newest">Newest</option>
      `;

		// Append elements
		wrapper.appendChild(document.createTextNode("Filter by:"));
		wrapper.appendChild(genreSelect);
		wrapper.appendChild(sortSelect);
		this.shadowRoot.appendChild(wrapper);

		/**
		 * Updates the podcast list based on selected genre and sort order.
		 * @function updateList
		 */
		const updateList = () => {
			const selectedGenre = genreSelect.value;
			const selectedSort = sortSelect.value;

			/** @type {Array} Filtered podcast list */
			let filtered = window.podcasts;

			//  Filter by genre
			if (selectedGenre !== "all") {
				const genreId = Number(selectedGenre);
				filtered = filtered.filter(
					(p) => Array.isArray(p.genres) && p.genres.includes(genreId)
				);
			}

			//  Sorting logic
			if (selectedSort === "lastUpdate") {
				filtered = [...filtered].sort(
					(a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
				);
			} else if (selectedSort === "popular") {
				filtered = [...filtered].sort(
					(a, b) => (b.popularity || 0) - (a.popularity || 0)
				);
			} else if (selectedSort === "newest") {
				filtered = [...filtered].sort(
					(a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
				);
			}

			//  Render filtered list
			window.renderPodcasts(
				filtered,
				document.getElementById("grid"),
				document.getElementById("podcastModal")
			);
		};

		// Event listeners
		genreSelect.addEventListener("change", updateList);
		sortSelect.addEventListener("change", updateList);
	}
}

// Register custom element
customElements.define("genre-filter", GenreFilter);
