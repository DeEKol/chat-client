<script lang="ts">
    import {userStore} from "../../app/providers/StoreProvider/store";
    import {io} from "socket.io-client";
    import {onMount} from "svelte";
    import MessageApi from "../../shared/api/MessageApi";
    import ChatWindow from "../../widgets/ChatWindow/ChatWindow.svelte";
    import ChatTop from "../../widgets/ChatTop/ChatTop.svelte";
    import ChatBottom from "../../widgets/ChatBottom/ChatBottom.svelte";

    export let room: any;

    let fileInput;
    let userId: number;
    let messageTextForFront: string = "";
    let messageTextForBackArr: any[] = [
        {text: "test message 1", room: 60, user: 1, time: '2024-04-25T12:10:25.017Z', id: 6},
        {text: "test message 2", room: 60, user: 1, time: '2024-04-25T12:10:25.017Z', id: 6},
    ];

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

        messageTextForBackArr = [...messageTextForBackArr, ...messageFromBackGet]
        messageTextForBackArr.sort((a, b) => a.id > b.id ? 1 : -1);

        socket.on("newMessageForBack", async (data: any) => {
            console.log("newMessageForBack", data)
            console.log(data)
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

    $: isUserInRoom = room.users.map((elem: any) => {
        return elem.id === $userStore.id;
    })
</script>

<div class="wrapper">
    {#if isUserInRoom.includes(true)}
        <ChatTop roomTitle={room.name} />
        <ChatWindow messagesArr={messageTextForBackArr} />

        <ChatBottom userId={userId} room={room} fileInput={fileInput} />
        {:else}
        <h2 class="red">No room access!!!</h2>
    {/if}
</div>

<style>
    .wrapper {
        flex-grow: 1;
    }

    .red {
        color: red;
    }
</style>
