import { TMDB_API_KEY } from '$env/static/private';

import { TMDB } from 'tmdb-ts';

const tmdb = new TMDB(TMDB_API_KEY);

export { tmdb };