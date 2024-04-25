<script lang="ts">
  import {userStore} from "../../app/providers/StoreProvider/store";
  import RoomApi from "../../shared/api/RoomApi";
  import {io} from "socket.io-client";
  import {onMount} from "svelte";
  import AuthApi from "../../shared/api/AuthApi";
  import MessageApi from "../../shared/api/MessageApi";

  export let room: any;

  let messageTextForFront: string = "";
  let messageTextForBackArr: any[] = [
      {text: "test message 1", room: 60, user: 1, time: '2024-04-25T12:10:25.017Z', id: 6},
      {text: "test message 2", room: 60, user: 1, time: '2024-04-25T12:10:25.017Z', id: 6},
  ];

  // type TMessage = {
  //     text: string,
  //     roomId: number,
  //     userId: number | undefined,
  // }

  $: messageForFront = {
      text: messageTextForFront,
      roomId: room.id,
      userId: $userStore.id,
      time: new Date(),
  }

  const socket = io("http://127.0.0.1:7000", {
      auth: {
          roomId: room.id,
          userId: $userStore.id,
      }
  });

  onMount(async () => {
      const messageFromBackGet = await MessageApi.getAllMessagesByRoom(room.id);

      console.log(room.id)
      console.log(messageFromBackGet)

      messageTextForBackArr = [...messageTextForBackArr, ...messageFromBackGet]

      socket.on("newMessageForBack", async (data: any) => {
          console.log("newMessageForBack", data)
          messageTextForBackArr = [...messageTextForBackArr, data];
      })
  });

  onMount(() => {
      console.log("Mounting...")
      return () => {
          socket.emit('dis');
          console.log("On destroy...");
      }
  })

  const onSendSocketMessage = () => {
      socket.emit('newMessageForFront', messageForFront)
  }

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

    {#each messageTextForBackArr as message}
        <div>Message: {message.text}</div>
    {/each}

    <input type="text" bind:value={messageTextForFront}>
    <button on:click={() => onSendSocketMessage()}>Send Message Socket</button>

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
