<script lang="ts">
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import AddMovieButton from '$lib/components/ui/AddMovieButton.svelte';
  import type { ActionResult } from '@sveltejs/kit';
  import { applyAction, deserialize } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import type { Movie } from 'tmdb-ts';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';
  import { tick } from 'svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area';

  let movieStore = $state<
    {
      movies: Movie[] | null,
      selectedMovie: Movie | null
    }>({
      movies: null,
      selectedMovie: null
  })

  let selectedDate: string = '';
  let selectedTime: string = '';

  const animateMoviePosters = () => {
    gsap.fromTo(
      '.scroll-posters',
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power4.out', delay: 0.4 }
    );
  };


  const handleSubmit = async (event: { currentTarget: EventTarget & HTMLFormElement} & SubmitEvent) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const response = await fetch(event.currentTarget.action, {
      method: 'POST',
      body: data
    });

    const result: ActionResult = deserialize(await response.text());

    if (result.type === 'success') {
      // rerun all `load` functions, following the successful update
      console.log(result.data)

      movieStore.movies = result.data as Movie[];

      if (browser) {
        await tick(); // Wait for DOM to update
        animateMoviePosters(); // Animate the movie posters
      }
      await invalidateAll();
    }

    await applyAction(result);
  };

  const selectMovie = (movie: Movie) => {
    movieStore.selectedMovie = movie;
  }

  const handleScheduleSubmit = async (event:  { currentTarget: EventTarget & HTMLFormElement}) => {
    const data = new FormData(event.currentTarget);

    // Include the selected movie ID
    data.append('movieId', movieStore.selectedMovie?.id.toString() || '');

    // Send data to server
    const response = await fetch('/api/schedule-movie', {
      method: 'POST',
      body: data
    });

    if (response.ok) {
      // Handle success (e.g., close dialog, show confirmation)
      console.log('Movie scheduled successfully');
      // Optionally, reset state and close dialog
      movieStore.selectedMovie = null;
      movieStore.movies = null;
      // Close the dialog if necessary
    } else {
      console.error('Error scheduling movie:', response.statusText);
    }
  };


</script>

<Dialog.Root>
  <Dialog.Trigger>
    <AddMovieButton />
  </Dialog.Trigger>
  <Dialog.Content class="max-w-[90vw] sm:max-w-[425px]">
    {#if !movieStore.selectedMovie}
      <form class="grid" method="POST" onsubmit={handleSubmit}>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="query" hidden class="text-right">Search</Label>
          <Input id="query" name="query" placeholder="search..." class="col-span-4" />
        </div>
      </div>

      <Dialog.Footer>
        <Button variant="secondary" type="submit">Submit</Button>
      </Dialog.Footer>

        {#if movieStore.movies}
          <!-- Wrap the movie posters inside ScrollArea -->
          <ScrollArea class="scroll-posters overflow-x-auto rounded-md border mt-4" orientation="horizontal">
            <div class="flex space-x-4 p-4">
              {#each movieStore.movies as movie, i}
                {#if movie.poster_path}
                  <div role="button"
                       onkeydown={(event) => event.key === 'Enter' && selectMovie(movie)}
                       tabindex={i} class="movie-poster w-24"
                       onclick={() => selectMovie(movie)}>
                    <div class="relative overflow-hidden rounded-md group">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-125"
                      />
                      <div
                        class="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-center items-center text-white text-center p-2"
                      >
                        <h3 class="text-sm font-semibold">{movie.title} ( {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'})</h3>
                        <p class="text-xs">Rating: {movie.vote_average}</p>
                      </div>
                    </div>
                  </div>
                {:else}
                  <!-- Placeholder for movies without a poster -->
                  <div class="movie-poster shrink-0 w-24 h-36 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                {/if}
              {/each}
            </div>
          </ScrollArea>
        {/if}
      </form>
    {:else}
      <form class="grid" method="POST" onsubmit={handleScheduleSubmit}>
        <div class="grid gap-4 py-4">
          <div class="flex items-center gap-4">
            <!-- Show selected movie poster -->
            <img
              src={`https://image.tmdb.org/t/p/w200${movieStore.selectedMovie.poster_path}`}
              alt={movieStore.selectedMovie.title}
              class="w-24 h-auto object-cover rounded-md"
            />
            <div>
              <h3 class="text-lg font-semibold">{movieStore.selectedMovie.title}</h3>
              <p class="text-sm">Rating: {movieStore.selectedMovie.vote_average}</p>
              <p class="text-sm">
                Year: {movieStore.selectedMovie.release_date
                ? movieStore.selectedMovie.release_date.slice(0, 4)
                : 'N/A'}
              </p>
            </div>
          </div>
          <!-- Date and Time Picker -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label for="date">Select Date</Label>
              <input
                type="date"
                id="date"
                name="date"
                bind:value={selectedDate}
                class="col-span-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <Label for="time">Select Time</Label>
              <input
                type="time"
                id="time"
                name="time"
                bind:value={selectedTime}
                class="col-span-1 p-2 border rounded-md w-full"
                required
              />
            </div>
          </div>
        </div>

        <Dialog.Footer class="flex justify-between">
          <Button variant="secondary" type="button" onclick={() => (movieStore.selectedMovie = null)}>
            Back
          </Button>
          <Button variant="secondary" type="submit">Schedule Movie</Button>
        </Dialog.Footer>
      </form>
    {/if}


  </Dialog.Content>
</Dialog.Root>

<style>
  .movie-poster img {
    border-radius: 4px;
  }
</style>