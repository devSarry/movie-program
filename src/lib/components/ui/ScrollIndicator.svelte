<script lang="ts">
	import { onMount, tick } from 'svelte';

	let scrollProgress = $state(0);
	let layoutOffset = $state(0);
	let layoutWidth = $state(0);

	// Access the sidebar state

	const handleScroll = () => {
		const scrollTop = window.scrollY;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		scrollProgress = (scrollTop / docHeight) * 100;
	};

	const updateLayoutDimensions = async () => {
		await tick(); // Wait for the DOM to update
		const layout = document.querySelector('.layout-container');
		if (layout) {
			layoutOffset = layout.getBoundingClientRect().left;
			layoutWidth = layout.clientWidth;
		}
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', updateLayoutDimensions);

		// Initial calculation
		updateLayoutDimensions();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateLayoutDimensions);
		};
	});
</script>

<!-- Scroll progress bar -->
<div
	class="duration-50 fixed top-[57px] z-10 h-[1px] bg-foreground transition-all ease-out"
	style="left: {layoutOffset}px; width: calc({layoutWidth}px * {scrollProgress / 100})"
></div>

<!-- Example layout container -->
<div class="layout-container mx-auto max-w-5xl">
	<!-- Your layout content goes here -->
</div>
