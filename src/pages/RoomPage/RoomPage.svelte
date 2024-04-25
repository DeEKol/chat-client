<script lang="ts">
  import Rooms from "../../entities/Rooms/Rooms.svelte";
  import Messages from "../../entities/Messages/Messages.svelte";
  import Users from "../../entities/Users/Users.svelte";

  export let roomName;

</script>

{#if roomName}
    <div class="wrapper">
        <h1>Room: {roomName}</h1>
    </div>
{/if}

<style>
  .wrapper {
    flex-grow: 1;
  }
</style>
