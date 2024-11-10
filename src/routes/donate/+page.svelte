<script lang="ts">
	import { loadStripe, type Stripe } from '@stripe/stripe-js';
	import { onMount } from 'svelte';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Icon from '@iconify/svelte';
	import { gsap } from 'gsap';

	let stripePromise: Promise<Stripe | null> | undefined;
	let amount: any = $state();
	let btcQrCode: string = $state(''); // Stores the generated QR code

	const prices = [1, 5, 10, 20, 50, 100];

	onMount(() => {
		// Load Stripe and generate BTC QR code on mount
		stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

		// Animate elements on load
		animateElements();
	});


	function animateElements() {
		gsap.fromTo(
			'.donate-card',
			{ opacity: 0, y: 20, scale: 0.95 },
			{ opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out', delay: 0.1 }
		);

		gsap.fromTo(
			'.donate-button',
			{ opacity: 0, scale: 0.95 },
			{ opacity: 1, scale: 1, duration: 2.5, ease: 'power4.out', stagger: 0.1 }
		);
	}

	async function handleDonate() {
		const stripe = await stripePromise;
		if (!stripe) {
			console.error('Stripe failed to load');
			return;
		}

		try {
			const theme = localStorage.getItem('mode-watcher-mode') || 'light';
			const response = await fetch('/api/donate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount, theme })
			});
			const { sessionId } = await response.json();
			if (sessionId) {
				await stripe.redirectToCheckout({ sessionId });
			}
		} catch (err) {
			console.error('An error occurred:', err);
		}
	}

	function donationMessage(amount: number) {
		const boldAmount = `<span class="font-bold bg-success text-success-foreground py-1 px-2 rounded-lg">$${amount || '0'}</span>`;
		if (!amount) return 'Enter an amount to donate, or choose from the options below.';
		if (amount === 1) return `Thank you for your ${boldAmount} donation! Every bit helps.`;
		if (amount <= 5) return `Your ${boldAmount} donation is greatly appreciated!`;
		if (amount <= 10) return `Thank you for your ${boldAmount} donation! Your support means a lot.`;
		if (amount <= 20)
			return `Thank you for your ${boldAmount} donation! We are grateful for your generosity.`;
		if (amount <= 50) return `A ${boldAmount} donation is amazing! Thank you for your generosity.`;
		if (amount <= 100)
			return `Your ${boldAmount} donation is deeply appreciated. Thank you for your outstanding support!`;

		return `You are donating ${boldAmount}. Thank you for your contribution!`;
	}
</script>

<div class="donate-card">
	<main
		class="mx-auto max-w-lg rounded-lg p-2 shadow-md transition-all duration-300 md:border md:p-5"
	>
		<h1 class="text-6xl font-bold">donate</h1>

		<div class="mt-10">
			<p>{@html donationMessage(amount)}</p>

			<div class="mt-5 flex gap-2">
				<Input
					type="number"
					bind:value={amount}
					class="focus:outline-none"
					placeholder="Enter amount"
					min="1"
				/>
				<Button on:click={handleDonate} class="group/donateButton">
					<div class="flex items-center gap-2">
						<span>Donate</span>
						<Icon
							icon="mdi:send"
							class="h-5 w-5"
						/>
					</div>
				</Button>
			</div>
		</div>

		<div class="mt-10 grid grid-cols-3 gap-2">
			{#each prices as price}
				<Button
					variant="success"
					class="donate-button transition-transform"
					on:click={() => (amount = price)}
				>
					$ {price}
				</Button>
			{/each}
		</div>
	</main>
</div>
