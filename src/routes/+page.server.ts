import type { PageServerLoad, Actions } from './$types';
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

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.log(data)
		const query = data.get('query') as string;

		const results = await tmdb.search.movies({ query: query});


		return results.results;
	}
} satisfies Actions;