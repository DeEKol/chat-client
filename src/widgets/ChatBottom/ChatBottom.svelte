<script lang="ts">
    import {messageStore, userStore} from "../../app/providers/StoreProvider/store";
    import {io} from "socket.io-client";
    import {onMount} from "svelte";
    import MessageApi from "../../shared/api/MessageApi";
    import AuthApi from "../../shared/api/AuthApi";

    export let room: any;

    let error = false;
    let imageUrl: any;
    let messageTextForFront: string = "";
    let messageTextForBackArr: any[] = [];

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
            messageTextForBackArr = [...messageTextForBackArr, data];
        })
    });

    onMount(() => {
        return () => {
            socket.emit('dis');
        }
    })

    const onSendSocketMessage = async (type: "text" | "img") => {
        await AuthApi.checkAuth();
        if ($messageStore.upd) {
            socket.emit('updMessageForFront', {id: $messageStore.upd, text: messageTextForFront, time: new Date()});

            setTimeout(() => {
                const el: HTMLElement | null = document.getElementById($messageStore.upd);
                el.scrollIntoView({behavior: "smooth", block: "center", inline: "start"})
            }, 10)
        } else {
            const imgText = type === "img" ? imageUrl : messageTextForFront;

            socket.emit('newMessageForFront', {...messageForFront, type: type, text: imgText});

            // ! scroll to bottom id
            setTimeout(() => {
                const el: HTMLElement | null = document.getElementById("bottom");
                el.scrollIntoView({behavior: "smooth", block: "end", inline: "start"})
            }, 30)
        }

        messageTextForFront = "";
    }

    // ! input img
    function handleFileChange(event: any) {
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
        {#if $messageStore.upd}
            <button on:click={() => $messageStore.upd = null}>Cancel upd</button>
        {/if}
        <button on:click={() => onSendSocketMessage("text")}>{$messageStore.upd ? "Upd" : "Send"}</button>
    </div>
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
        background: #58718c;

        padding: 7px;
        border-bottom-right-radius: 10px;

        position: sticky;
        bottom: 5px;
    }
    .message-area {
        display: flex;
        justify-content: space-between;
    }
    .textarea {
        resize: none;
    }
</style>
