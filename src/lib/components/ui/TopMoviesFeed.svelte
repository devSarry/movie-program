<script>
	import Marquee from '$lib/components/magic-ui/Marquee.svelte';
	import FeatureCard from '$lib/components/magic-ui/FeatureCard.svelte';
	import Animate from '$lib/components/ui/Animate.svelte';
	import { page } from '$app/stores';

	let topMoves = $page.data.topMovies.map(movie => {
		return {
			title: movie.title,
			body: movie.overview,
			url: `https://www.themoviedb.org/movie/${movie.id}`,
			poster: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
		}
	});

</script>

<Animate>
	<div>
		<h1 class="mb-2 text-4xl font-bold">Top Movies</h1>
		<div
			class="relative my-2 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background"
		>
			<Marquee pauseOnHover class="[--duration:150s]">
				{#each topMoves as item}
					<FeatureCard {...item} />
				{/each}
			</Marquee>
			<div
				class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"
			></div>
			<div
				class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
			></div>
		</div>
	</div>
</Animate>
