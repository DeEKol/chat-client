<script lang="ts">
    import {io} from "socket.io-client";
    import {onMount} from "svelte";

    import { userStore } from "@app/providers/StoreProvider/store";
    import ChatWindow from "@widgets/ChatWindow/ChatWindow.svelte";
    import ChatTop from "@widgets/ChatTop/ChatTop.svelte";
    import ChatBottom from "@widgets/ChatBottom/ChatBottom.svelte";
    import MessageApi from "@shared/api/MessageApi";
    import RoomApi from "@shared/api/RoomApi";
    import { TitleUI } from "@shared/ui";
    import type { TSizeProp } from "@shared/ui";

    export let room: any;

    let fileInput: any;
    let userId: number;
    let messageTextForBackArr: any[] = [];

    const socket = io("http://127.0.0.1:7000", {
        auth: {
            roomId: room.id,
            userId: $userStore.id,
        }
    });

    onMount(async () => {
        const roomUpd = await RoomApi.getUserInRoom(room.id);
        room = roomUpd[0];

        const messageFromBackGet = await MessageApi.getAllMessagesByRoom(room.id);

        messageTextForBackArr = [...messageTextForBackArr, ...messageFromBackGet]
        messageTextForBackArr.sort((a, b) => a.id > b.id ? 1 : -1);

        socket.on("newMessageForBack", async (data: any) => {
            messageTextForBackArr = [...messageTextForBackArr, data];
        })
        socket.on("updMessageForBack", async (data: any) => {
            const index = messageTextForBackArr.findIndex(obj => obj.id === data.id);

            if (index != -1) {
                messageTextForBackArr[index] = data;
            }
        })

        // setTimeout(() => {
        //     const el: HTMLElement | null = document.getElementById("bottom");
        //     el.scrollIntoView(false)
        // }, 10)
    });

    onMount(() => {
        return () => {
            socket.emit('dis');
        }
    })

    $: isUserInRoom = room.users.map((elem: any) => {
        return elem.id === $userStore.id;
    })

    const roomPageSizeProp: TSizeProp = "L";
</script>

<div class="room-page">
    {#if isUserInRoom.includes(true)}
        <ChatTop roomTitle={room.name} userId={userId} room={room} messagesArr={messageTextForBackArr} />
        <ChatWindow messagesArr={messageTextForBackArr} />

        <ChatBottom room={room} fileInput={fileInput} />
        {:else}
        <TitleUI
                levelProp={2}
                sizeProp={roomPageSizeProp}
                classExtendProp="room-page__title-ui"
        >
            No room access!!!
        </TitleUI>
    {/if}
</div>

<style lang="scss">
    /* Базово слои должны соответствовать каскадности css (если поменялись местами оставлять TO:DO) */
    /* extend - взят из родительского компонента */
    /* Порядок: @layer normalize, global, base, adds, mods, extend; */
    @layer normalize, global, base, adds, mods, extend;

    /* ? Component styles */
    @layer base {
        .room-page {
            flex-grow: 1;

            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            /*overflow: auto;*/
            position: relative;
        }
        .red {
            color: red;
        }
    }

    /* ? Prop styles */
    /* Задавать css слой, чтоб использовать его внутри дочернего компонента */
    @layer extend {
        .room-page :global(.room-page__title-ui) {
            color: red;
        }
    }
</style>
