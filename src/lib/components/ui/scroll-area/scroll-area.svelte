<script lang="ts">
	import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
	import { Scrollbar } from "./index.js";
	import { cn } from "$lib/utils.js";
	import { onMount } from 'svelte';


	type $$Props = ScrollAreaPrimitive.Props & {
		orientation?: "vertical" | "horizontal" | "both";
		scrollbarXClasses?: string;
		scrollbarYClasses?: string;
		scrollPosition?: number;
	};

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let orientation = "vertical";
	export let scrollbarXClasses: string = "";
	export let scrollbarYClasses: string = "";
	export let scrollPosition: number | undefined;

	// Bind to the DOM element
	let viewportElement: HTMLElement;

	onMount(() => {
		if (scrollPosition !== undefined && viewportElement) {
			const contentElement = viewportElement.querySelector('.scrollarea-content');

			if (contentElement) {
				let elementsArray = Array.from(contentElement.children);

				// If there's only one child (e.g., a wrapper div), use its children
				if (elementsArray.length === 1) {
					const firstChild = elementsArray[0] as HTMLElement;
					elementsArray = Array.from(firstChild.children);
				}

				if (scrollPosition >= 0 && scrollPosition < elementsArray.length) {
					const targetElement = elementsArray[scrollPosition];
					if (targetElement) {
						//viewportElement.scrollDown += targetElement.scrollHeight * scrollPosition
						// targetElement.scrollIntoView({ behavior: 'smooth' });
					}
				}
			}
		}
	});
</script>

<ScrollAreaPrimitive.Root {...$$restProps} class={cn("relative overflow-hidden", className)}>
	<!-- Bind to 'el' instead of 'this' -->
	<ScrollAreaPrimitive.Viewport bind:el={viewportElement} class="h-full w-full rounded-[inherit] snap-y">
		<ScrollAreaPrimitive.Content class="scrollarea-content">
			<slot />
		</ScrollAreaPrimitive.Content>
	</ScrollAreaPrimitive.Viewport>
	{#if orientation === "vertical" || orientation === "both"}
		<Scrollbar orientation="vertical" class={scrollbarYClasses} />
	{/if}
	{#if orientation === "horizontal" || orientation === "both"}
		<Scrollbar orientation="horizontal" class={scrollbarXClasses} />
	{/if}
	<ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>


<style>

</style>