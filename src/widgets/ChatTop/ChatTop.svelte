<script lang="ts">
    import RoomApi from "../../shared/api/RoomApi";

    export let roomTitle: string;
    export let userId: number;
    export let room: any;
    export let messagesArr: any;


    let findMsg: string = "";

    const onUpdateRoom = async (roomId: number, userId: number) => {
        if (roomId && userId) {
            const roomUpd = await RoomApi.updateRoom(roomId, userId);
        }
    }

    const onFindMsg = () => {
        const foundObj = messagesArr.find(obj => obj.text.includes(findMsg))

        setTimeout(() => {
            const el: HTMLElement | null = document.getElementById(foundObj.id);
            el.scrollIntoView({behavior: "smooth", block: "center", inline: "start"})
        }, 10)

        console.log(foundObj)
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
    <div>
        <input placeholder="Message" bind:value={findMsg}>
        <button placeholder="Find msg" on:click={onFindMsg}>Find</button>
    </div>
</div>

<style>
    .wrapper {
        background: #58718c;

        padding: 7px;
        border-top-right-radius: 10px;

        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 5px;
    }
</style>
