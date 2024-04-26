<script lang="ts">
    import RoomApi from "../../shared/api/RoomApi";

    export let roomTitle: string;
    export let userId: number;
    export let room: any;

    const onUpdateRoom = async (roomId: number, userId: number) => {
        if (roomId && userId) {
            const room = await RoomApi.updateRoom(roomId, userId);
        }
    }
</script>

<div class="wrapper">
    <h2>Room: {roomTitle}</h2>
    <div>
        Users in room:
        {#each room.users as user}
            <span>{user.username}, </span>
            {/each}
    </div>
    <form on:submit|preventDefault method="post">
        <label>
            <input name="userId" placeholder="user id" type="text" bind:value={userId}>
        </label>
        <button on:click={() => onUpdateRoom(room.id, userId)}>Add User In Room</button>
    </form>
</div>

<style>
    .wrapper {
        background: #58718c;

        padding: 7px;
        border-top-right-radius: 10px;
    }
</style>
