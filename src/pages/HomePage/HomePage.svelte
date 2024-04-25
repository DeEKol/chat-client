<script lang="ts">
    import {Route} from 'tinro';
    import TestPage from "../TestPage/TestPage.svelte";
    import {onMount} from "svelte";
    import RoomApi from "../../shared/api/RoomApi";
    import RoomPage from "../RoomPage/RoomPage.svelte";
    import {userStore} from "../../app/providers/StoreProvider/store";

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

    $: console.log(rooms)
    $: console.log(reactiveRooms)
</script>

<div class="wrapper">
    <nav>
        <a href="/">Home</a>
<!--        <a href="/portfolio">Portfolio</a>-->
        <a href="/test">Test Page</a>

        {#if rooms}
            {#each rooms as room}
                <a href={"/room/" + room.name}>Room: {room.name}</a>
            {/each}
        {/if}
    </nav>

    <Route path="/"><h1>This is the main page</h1></Route>
<!--    <Route path="/portfolio/*">-->
<!--        <Route path="/">-->
<!--            <h1>Portfolio introduction</h1>-->
<!--            <nav>-->
<!--                <a href="/portfolio/sites">Sites</a>-->
<!--                <a href="/portfolio/photos">Photos</a>-->
<!--            </nav>-->
<!--        </Route>-->
<!--        <Route path="/sites"><h1>Portfolio: Sites</h1></Route>-->
<!--        <Route path="/photos"><h1>Portfolio: Photos</h1></Route>-->
<!--    </Route>-->
    <Route path="/test"><TestPage /></Route>

    {#each reactiveRooms as room, index}
        <!--{#if room.users.map((user) => user.id === $userStore.id)}-->
            <Route path={"/room/" + room.name}><RoomPage room={room} /></Route>
        <!--{/if}-->
    {/each}
    <form on:submit|preventDefault method="post">
        <label>
            room name
            <input name="username" type="text" bind:value={name}>
        </label>
        <button on:click={() => onCreateRoom(name)}>Create Room</button>
    </form>
</div>

<style>
    .wrapper {
        flex-grow: 1;
    }
</style>
