<script lang="ts">
  import {userStore} from "../../app/providers/StoreProvider/store";
  import RoomApi from "../../shared/api/RoomApi";

  export let room: any;

  let userId: number;

  $: isUserInRoom = room.users.map((elem: any) => {
        return elem.id === $userStore.id;
  })

  $: console.log(isUserInRoom.includes(true))

  const onUpdateRoom = async (roomId: number, userId: number) => {
      console.log("update");
      console.log(roomId);
      console.log(userId);
      if (roomId && userId) {
          const room = await RoomApi.updateRoom(roomId, userId);
          console.log(room)
      }
  }

</script>

{#if isUserInRoom.includes(true)}
    <div class="wrapper">
        <h2>Room: {room.name}</h2>
    </div>

    <form on:submit|preventDefault method="post">
        <label>
            user id
            <input name="userId" type="text" bind:value={userId}>
        </label>
        <button on:click={() => onUpdateRoom(room.id, userId)}>Add User In Room</button>
    </form>
    {:else}
    <h2 class="red">No room access!!!</h2>
{/if}

<style>
  .wrapper {
    flex-grow: 1;
  }

  .red {
      color: red;
  }
</style>
