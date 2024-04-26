<script lang="ts">
    import {Route} from 'tinro';
    import TestPage from "../TestPage/TestPage.svelte";
    import {onMount} from "svelte";
    import RoomApi from "../../shared/api/RoomApi";
    import RoomPage from "../RoomPage/RoomPage.svelte";
    import {userStore} from "../../app/providers/StoreProvider/store";
    import UsersPage from "../UsersPage/UsersPage.svelte";

    let rooms: any[] = [];
    let name: string;

    onMount(async () => {
      rooms = await RoomApi.getAllRooms();
    });

    const onCreateRoom = async (name: string) => {
        if (name) {
            const room:any = await RoomApi.createRoom(name, $userStore.id);

            rooms = [...rooms, room];
            name = "";
        }
    }

    $: reactiveRooms = rooms;
</script>

<div class="wrapper">
    <div class="nav-container">
        <h2>Navigation</h2>
        <nav class="nav">
<!--            <a href="/">Home</a>-->
<!--            <a href="/test">Test Page</a>-->
            <a href="/users">Users Page</a>

            <h4>Rooms</h4>
            {#if rooms}
                {#each rooms.sort((a, b) => a.id > b.id ? 1 : -1) as room}
                    <a href={"/room/" + room.name}>{room.name}</a>
                {/each}
            {/if}
        </nav>
        <form class="create-room" on:submit|preventDefault method="post">
            <label>
                <input name="username" placeholder="room name" type="text" bind:value={name}>
            </label>
            <button on:click={() => onCreateRoom(name)}>Create Room</button>
        </form>
    </div>

    <div class="route-container">
        <Route path="/"><h1>Home page!!!</h1></Route>
        <Route path="/test"><TestPage /></Route>
        <Route path="/users"><UsersPage /></Route>

        {#each reactiveRooms as room, index}
            <Route path={"/room/" + room.name}><RoomPage room={room} /></Route>
        {/each}
    </div>
</div>

<style>
    .wrapper {
        flex-grow: 1;
        display: flex;
        /*max-height: 1000px;*/
    }
    .nav-container {
        display: flex;
        flex-direction: column;
        align-items: end;
        padding: 20px;

        background: #58718c;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .nav {
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    .create-room {
        display: flex;
        flex-direction: column;
        align-items: end;
    }
</style>
