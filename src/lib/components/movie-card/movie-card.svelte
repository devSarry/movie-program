
<script lang="ts">
  import * as Card from "$lib/components/ui/card";
</script>

<Card.Root>
  <Card.Content>
    <div class="grid grid-cols-3 gap-2 mt-4 items-center">
      <div class="col-span-1">
        <img
          src="https://placehold.co/40x60"
          alt="Movie poster"
          class="rounded-md"
        />
      </div>
      <div>
        <h3 class="text-xl font-semibold">Movie Title</h3>
        <p class="text-sm text-muted-foreground">2023</p>
      </div>
      <div>
        Next Sunday 12:00 PM
      </div>
    </div>
  </Card.Content>
</Card.Root>

