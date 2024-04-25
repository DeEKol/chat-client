<script lang="ts">
    import {Route} from 'tinro';
    import TestPage from "../TestPage/TestPage.svelte";
    import {onMount} from "svelte";
    import RoomApi from "../../shared/api/RoomApi";
    import RoomPage from "../RoomPage/RoomPage.svelte";

    let rooms: any[] = [];

    onMount(async () => {
      rooms = await RoomApi.getAllRooms();
    });
</script>

<div class="wrapper">
    <nav>
        <a href="/">Home</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/test">Test Page</a>

        {#if rooms}
            {#each rooms as room}
                <a href={"/room/" + room.name}>Room: {room.name}</a>
            {/each}
        {/if}
    </nav>

    <Route path="/"><h1>This is the main page</h1></Route>
    <Route path="/portfolio/*">
        <Route path="/">
            <h1>Portfolio introduction</h1>
            <nav>
                <a href="/portfolio/sites">Sites</a>
                <a href="/portfolio/photos">Photos</a>
            </nav>
        </Route>
        <Route path="/sites"><h1>Portfolio: Sites</h1></Route>
        <Route path="/photos"><h1>Portfolio: Photos</h1></Route>
    </Route>
    <Route path="/test"><TestPage /></Route>

    {#each rooms as room}
        <Route path={"/room/" + room.name}><RoomPage roomName={room.name} /></Route>
    {/each}
</div>

<style>
    .wrapper {
        flex-grow: 1;
    }
</style>
