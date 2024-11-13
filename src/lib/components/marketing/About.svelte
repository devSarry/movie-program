<script lang="ts">
	import { PUBLIC_REPOSITORY_URL } from '$env/static/public';
	import Animate from '$lib/components/ui/Animate.svelte';
	import { MovieCard } from '$lib/components/movie-card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { AddMovieDialog } from '$lib/components/add-movie-dialog';
</script>

<main class="flex flex-col h-screen">
	<ScrollArea scrollPosition={4} class="h-2/3 overflow-y-scroll mb-7">
		<div class="p-4">

			<MovieCard title={1} />
			<MovieCard title={2} />
			<MovieCard title={3} />
			<MovieCard title={4} />
			<MovieCard title={5} />
			<MovieCard title={6} />
			<MovieCard title={7} />
			<MovieCard title={8} />
			<MovieCard title={9} />
			<MovieCard title={10} />
			<MovieCard title={11} />

		</div>
	</ScrollArea>
	<AddMovieDialog />
</main>
