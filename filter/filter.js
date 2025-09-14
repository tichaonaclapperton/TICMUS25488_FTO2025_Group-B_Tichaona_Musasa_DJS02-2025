// Filter podcasts by genre numbers 1–5
export function filterByGenre(podcasts, genreId) {
	if (genreId === "all") return podcasts;

	const id = Number(genreId);
	return podcasts.filter((p) =>
		p.genres.some((g) => g >= 1 && g <= 5 && g === id)
	);
}
