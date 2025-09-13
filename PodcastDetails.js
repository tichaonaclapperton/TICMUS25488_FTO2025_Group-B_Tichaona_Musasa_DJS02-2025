// getPodcastDetails.js
import { podcasts, genres, seasons } from "./data.js";

/**
 * Resolve full podcast details by ID.
 * @param {string} id - Podcast ID
 * @returns {object|null} Podcast with full details or null if not found
 */
export function getPodcastDetails(id) {
	const podcast = podcasts.find((p) => p.id === id);
	if (!podcast) return null;

	// Map genre IDs to full genre objects
	const podcastGenres = podcast.genres
		.map((gid) => genres.find((g) => g.id === gid))
		.filter(Boolean);

	// Get season details
	const podcastSeasons = seasons.find((s) => s.id === id)?.seasonDetails || [];

	return {
		...podcast,
		genres: podcastGenres,
		seasonDetails: podcastSeasons,
	};
}
