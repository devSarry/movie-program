<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		title: string;
		body: string;
		url: string;
		poster: string
	}

	let {
		title,
		body,
		url,
		poster
	}: Props = $props();
</script>

<a
	href={url}
	class={cn(
		'relative w-64 cursor-pointer overflow-hidden rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-[1px] hover:shadow'
	)}
>
	<div class="flex flex-col">
		<div class="flex items-center gap-2">
			<img class="h-50 w-20 text-gray-500" src="{poster}" alt="Movie poster for {title}"/>
			<!-- svelte-ignore a11y_figcaption_parent -->
			<div class="text-sm font-medium dark:text-white">
				{title}
			</div>
		</div>
	</div>
	<blockquote class="mt-2 text-sm text-muted-foreground line-clamp-3">{body}</blockquote>
</a>
