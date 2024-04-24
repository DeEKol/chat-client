<script lang="ts">
    import RoomApi from "../../shared/api/RoomApi";
    import MessageApi from "../../shared/api/MessageApi";

    let messageId: number;
    let text: string;
    let roomId: number;
    let userId: number;
    let time: string;

    const onGetAllMessages = async () => {
        const users = await MessageApi.getAllMessages();
        console.log(users);
    }

    const onGetMessage = async (id: number) => {
        console.log(id);
        if (id) {
            const user = await MessageApi.getMessage(id);
            console.log(user);
        }
    }

    const onCreateMessage = async (text: string, roomId: number, userId: number) => {
        console.log("create");
        console.log(text);
        if (text && roomId && userId) {
            const message = await MessageApi.createMessage(text, roomId, userId);
            console.log(message)
        }
    }

    const onDeleteMessage = async (id: number) => {
        console.log("delete");
        console.log(id);
        if (id) {
            const message = await MessageApi.deleteMessage(id);
            console.log(message)
        }
    }
</script>

<div class="wrapper">
    <h2>Messages</h2>
    <button on:click={() => onGetAllMessages()}>Get All Messages</button>
    <form on:submit|preventDefault method="get">
        <label>
            id room
            <input name="user" type="number" bind:value={roomId}>
        </label>
        <button on:click={() => onGetMessage(roomId)}>Get Message</button>
    </form>
    <label>
        id room
        <input name="user" type="number" bind:value={roomId}>
        <button on:click={() => onDeleteMessage(roomId)}>Delete Message</button>
    </label>
    <form on:submit|preventDefault method="post">
        <label>
            text
            <input name="text" type="text" bind:value={text}>
        </label>
        <label>
            room id
            <input name="roomId" type="text" bind:value={roomId}>
        </label>
        <label>
            user id
            <input name="userId" type="text" bind:value={userId}>
        </label>
        <button on:click={() => onCreateMessage(text, roomId, userId)}>Create Message</button>
    </form>
</div>

<style>
    .wrapper {
        flex-grow: 1;
    }
</style>