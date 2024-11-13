<script lang="ts">
	import { PUBLIC_DOCS_URL, PUBLIC_REPOSITORY_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button/index.js';
	import Icon from '@iconify/svelte';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	onMount(() => {
		gsap.fromTo(
			'.spatz-stack',
			{ opacity: 0 },
			{
				opacity: 1,
				x: 0,
				duration: 3,
				ease: 'power4.out'
			}
		);

		gsap.fromTo(
			'.spatz-stack-2',
			{ opacity: 0, x: -25 },
			{
				opacity: 1,
				x: 0,
				duration: 2,
				ease: 'power4.out'
			}
		);
	});
</script>

<div class="mt-5 md:mt-0">
	<h1 class="text-5xl md:text-6xl">
		<div class="spatz-stack flex items-center font-extrabold tracking-tight">
			<div>movie</div>
			<div class="spatz-stack-2 font-thin tracking-tighter text-foreground/[50%]"> cue</div>
		</div>
	</h1>

<!--	<p class="my-5 text-sm text-muted-foreground">-->
<!--		Press-->
<!--		<kbd-->
<!--			class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"-->
<!--		>-->
<!--			<span class="text-xs">⌘</span>J-->
<!--		</kbd>-->
<!--		to open the command palette-->
<!--	</p>-->

</div>
