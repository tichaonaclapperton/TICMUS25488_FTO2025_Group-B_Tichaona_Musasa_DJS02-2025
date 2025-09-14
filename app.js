import { podcasts } from "./data.js";
import { getPodcastDetails } from "./podCastDetails.js";
import { renderPodcasts } from "./filter/render.js";
import "./filter/genre-filter.js"; // web component

// Make globally accessible for filter component
window.podcasts = podcasts;
window.renderPodcasts = renderPodcasts;

const grid = document.getElementById("grid");
const modal = document.getElementById("podcastModal");

// Render podcast previews
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

// Initial full render
renderPodcasts(podcasts, grid, modal);
