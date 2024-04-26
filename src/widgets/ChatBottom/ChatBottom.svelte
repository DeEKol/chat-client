<script lang="ts">
  import {userStore} from "../../app/providers/StoreProvider/store";
  import RoomApi from "../../shared/api/RoomApi";
  import {io} from "socket.io-client";
  import {onMount} from "svelte";
  import AuthApi from "../../shared/api/AuthApi";
  import MessageApi from "../../shared/api/MessageApi";
  import ChatWindow from "../../widgets/ChatWindow/ChatWindow.svelte";
  import ChatTop from "../../widgets/ChatTop/ChatTop.svelte";

  export let room: any;

  let imageUrl: any;
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

    messageTextForBackArr.sort((a, b) => a.id > b.id ? 1 : -1);

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

  const onSendSocketMessage = (type: "text" | "img") => {
    console.log("onSendSocketMessage");
    const imgText = type === "img" ? imageUrl : messageTextForFront;
    socket.emit('newMessageForFront', {...messageForFront, type: type, text: imgText});
  }

  export let userId: number;

  $: isUserInRoom = room.users.map((elem: any) => {
    return elem.id === $userStore.id;
  })

  const onUpdateRoom = async (roomId: number, userId: number) => {
    console.log("update");
    if (roomId && userId) {
      const room = await RoomApi.updateRoom(roomId, userId);
      console.log(room)
    }
  }


  let error = false;
  // ! input img
  function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      imageUrl = reader.result;
      onSendSocketMessage("img");
    };

    if (file && file.size < 1048576) {
      reader.readAsDataURL(file);
    } else {
        error = true;
        setTimeout(() => {
            error = false;
        }, 3000)
        console.warn("Select a file less than 1mb");
    }
  }

  export let fileInput: any;

  const handleButtonClick = () => {
    fileInput.click();
  }
  // ! input img end

  $: console.log(error)

</script>
<div class="wrapper">
    <div class="message-area">
        <!-- ! input img-->
        <input type="file" bind:this={fileInput} hidden="true" on:change={handleFileChange}>
        <div class="btn-wrapper">
            <div class="error-img" class:error={error}>Select a file less than 1mb</div>
            <button on:click={handleButtonClick}>Add Image</button>
        </div>
        <!-- ! input img end-->
        <textarea class="textarea" class:error bind:value={messageTextForFront} />
        <button on:click={() => onSendSocketMessage("text")}>Send</button>
    </div>

    <form on:submit|preventDefault method="post">
        <label>
            user id
            <input name="userId" type="text" bind:value={userId}>
        </label>
        <button on:click={() => onUpdateRoom(room.id, userId)}>Add User In Room</button>
    </form>
</div>
<style>
    .btn-wrapper {
        position: relative;
    }
    .error-img {
        color: red;
        position: absolute;
        right: 0;
        bottom: 10%;
        display: none;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 10px;
    }
    .error {
        display: block;
    }
    .wrapper {
        /*flex-grow: 1;*/
        background: #58718c;

        padding: 7px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .message-area {
        display: flex;
        justify-content: space-between;
    }
    .textarea {
        resize: none;
    }

    .red {
        color: red;
    }
</style>
