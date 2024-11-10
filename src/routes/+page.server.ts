import type { PageServerLoad } from './$types';
import { tmdb } from '$lib/tmbd';

export const load: PageServerLoad = async () => {

	const discoveredMovies = await tmdb.discover.movie({
		region: 'US',
		sort_by: 'popularity.desc',
	})

	return {
		topMovies: discoveredMovies.results
	};
}