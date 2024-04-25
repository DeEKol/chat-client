<script lang="ts">
    import RoomApi from "../../shared/api/RoomApi";

    let userId: number;
    let roomId: number;
    let name: string;

    const onGetAllRooms = async () => {
        const rooms = await RoomApi.getAllRooms();
        console.log(rooms);
    }

    const onGetRoom = async (id: number) => {
        console.log(id);
        if (id) {
            const room = await RoomApi.getRoom(id);
            console.log(room);
        }
    }

    const onCreateRoom = async (name: string) => {
        console.log("create");
        console.log(name);
        if (name) {
            const room = await RoomApi.createRoom(name);
            console.log(room)
        }
    }

    const onUpdateRoom = async (roomId: number, userId: number) => {
        console.log("update");
        console.log(roomId);
        console.log(userId);
        if (roomId && userId) {
            const room = await RoomApi.updateRoom(roomId, userId);
            console.log(room)
        }
    }

    const onDeleteRoom = async (id: number) => {
        console.log("delete");
        console.log(id);
        if (id) {
            const room = await RoomApi.deleteRoom(id);
            console.log(room)
        }
    }

    const onGetUsersInRoom = async (id: number) => {
        const users = await RoomApi.getUserInRoom(id);
        console.log(users);
    }
</script>

<div class="wrapper">
    <h2>Rooms</h2>
    <button on:click={() => onGetAllRooms()}>Get All Rooms</button>
    <form on:submit|preventDefault method="get">
        <label>
            id room
            <input name="user" type="number" bind:value={roomId}>
        </label>
        <button on:click={() => onGetRoom(roomId)}>Get Room</button>
    </form>
    <label>
        id room
        <input name="user" type="number" bind:value={roomId}>
        <button on:click={() => onDeleteRoom(roomId)}>Delete Room</button>
    </label>
    <form on:submit|preventDefault method="post">
        <label>
            room name
            <input name="username" type="text" bind:value={name}>
        </label>
        <button on:click={() => onCreateRoom(name)}>Create Room</button>
    </form>

    <form on:submit|preventDefault method="get">
        <label>
            id room
            <input name="user" type="number" bind:value={roomId}>
        </label>
        <button on:click={() => onGetUsersInRoom(roomId)}>Get Users In Room</button>
    </form>

    <form on:submit|preventDefault method="post">
        <label>
            room id
            <input name="roomId" type="text" bind:value={roomId}>
        </label>
        <label>
            user id
            <input name="userId" type="text" bind:value={userId}>
        </label>
        <button on:click={() => onUpdateRoom(roomId, userId)}>Add User In Room</button>
    </form>
</div>

<style>
    .wrapper {
        flex-grow: 1;
    }
</style>
