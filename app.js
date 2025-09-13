import { podcasts } from "./data.js";
import { getPodcastDetails } from "./podCastDetails.js";

const grid = document.getElementById("grid");
const modal = document.getElementById("podcastModal"); // select by ID

podcasts.forEach((p) => {
	const details = getPodcastDetails(p.id);
	const preview = document.createElement("podcast-preview");
	preview.data = details;

	// Open modal when clicked
	preview.addEventListener("podcast-click", () => {
		modal.open(details);
	});

	grid.appendChild(preview);
});
