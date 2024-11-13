<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { onMount, tick } from 'svelte';
	import AddMovieButton from '$lib/components/ui/AddMovieButton.svelte';
	import Hero from '$lib/components/marketing/Hero.svelte';
	import Stats from '$lib/components/marketing/Stats.svelte';
	import About from '$lib/components/marketing/About.svelte';
	import TopMoviesFeed from '$lib/components/ui/TopMoviesFeed.svelte';

	import { animateMainStagger } from '$lib/animations';

	let hidden = $state(true);

	let stars = $state(0),
		issues = $state(0),
		forks = $state(0);

	const getStars = async () => {
		const res = await fetch(`${PUBLIC_BASE_URL}/api/repo-data`);
		console.log(res);
		const { stars: fetchedStars, issues: fetchedIssues, forks: fetchedForks } = await res.json();
		stars = fetchedStars;
		issues = fetchedIssues;
		forks = fetchedForks;
	};

	onMount(async () => {
		hidden = false;
		animateMainStagger();
		await getStars();
		await tick(); // Wait for DOM updates
	});
</script>

<div class={`${hidden ? 'opacity-0' : ''} mx-auto w-full max-w-2xl px-2 md:px-0`}>
	<div class="mb-10 flex flex-col gap-16 md:gap-16">
		<div class="">
			<Hero />
		</div>
		<About />
		<div class="animate-item">
			<TopMoviesFeed />
		</div>



	</div>
</div>

<style>
	.fade-in {
		opacity: 0;
		transition: opacity 0.5s ease-out;
	}
</style>
