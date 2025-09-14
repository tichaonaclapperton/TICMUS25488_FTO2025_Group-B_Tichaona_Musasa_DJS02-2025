import { getPodcastDetails } from "../PodcastDetails.js";

/**
 * Renders a list of podcasts into a grid container.
 *
 * @function renderPodcasts
 * @param {Array<Object>} podcastArray - Array of podcast objects to render.
 * @param {HTMLElement} grid - The container element where podcast previews will be rendered.
 * @param {Object} modal - The modal component used to display podcast details.
 *
 * Podcast object shape:
 * {
 *   id: string,        // Unique identifier for the podcast
 *   title?: string,    // Title of the podcast
 *   description?: string, // Description of the podcast
 *   image?: string,    // Image URL for the podcast
 *   ...otherProps
 * }
 *
 * @example
 * renderPodcasts(podcasts, document.getElementById("grid"), podcastModal);
 */
export function renderPodcasts(podcastArray, grid, modal) {
	grid.innerHTML = ""; // Clear previous content

	podcastArray.forEach((p) => {
		//  Fetch additional podcast details
		const details = getPodcastDetails(p.id);

		//  Create a preview component
		const preview = document.createElement("podcast-preview");
		preview.data = details;

		//  Open modal when podcast is clicked
		preview.addEventListener("podcast-click", () => {
			modal.open(details);
		});

		//  Append preview to grid
		grid.appendChild(preview);
	});
}
