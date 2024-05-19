<script lang="ts">
    import {onMount} from "svelte";
    import {Route} from 'tinro';


    import RoomPage from "@pages/RoomPage/RoomPage.svelte";
    import UsersPage from "@pages/UsersPage/UsersPage.svelte";
    import TestPage from "@pages/TestPage/TestPage.svelte";
    import HomePage from "@pages/HomePage";
    import RoomApi from "@shared/api/RoomApi";
    import { TitleUI } from "@shared/ui";
    import type { TSizeProp } from "@shared/ui";
    import {userStore} from "../../StoreProvider/store";

    let rooms: any[] = [];
    let name: string;
    let isError: boolean = false;

    onMount(async () => {
      rooms = await RoomApi.getAllRooms();
    });

    const onCreateRoom = async (name: string) => {
        if (name) {
            try {
                const room:any = await RoomApi.createRoom(name, $userStore.id);

                rooms = [...rooms, room];
            } catch (error) {
                console.warn(error)

                isError = true;
                setTimeout(() => {
                    isError = false;
                }, 2000)
            } finally {
                name = "";
            }
        }
    }

    $: reactiveRooms = rooms;

    /* ? Props */
    /* По возможности типизируем пропсы */
    const routerProviderSizePropOne: TSizeProp = "L";
    const routerProviderSizePropTwo: TSizeProp = "M";
</script>

<main class="router-provider">
    <div class="nav-container">
        <TitleUI
                classExtendProp="router-provider__title-ui-one"
                levelProp={2}
                sizeProp={routerProviderSizePropOne}
        >
            Navigation
        </TitleUI>
        <nav class="nav">
            <a href="/">Home</a>
<!--            <a href="/test">Test Page</a>-->
            <a href="/users">Find Users Page</a>

            <h4>Rooms</h4>
            <TitleUI
                    classExtendProp="router-provider__title-ui-two"
                    levelProp={4}
                    sizeProp={routerProviderSizePropTwo}
            >
                Rooms
            </TitleUI>
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
            <button on:click={() => onCreateRoom(name)} class:error={isError}>Create Room</button>
        </form>
    </div>

    <div class="route-container">
        <Route path="/"><HomePage /></Route>
        <Route path="/test"><TestPage /></Route>
        <Route path="/users"><UsersPage /></Route>

        {#each reactiveRooms as room, index}
            <Route path={"/room/" + room.name}><RoomPage room={room} /></Route>
        {/each}
    </div>
</main>

<style lang="scss">
    /* Базово слои должны соответствовать каскадности css (если поменялись местами оставлять TO:DO) */
    /* extend - взят из родительского компонента */
    /* Порядок: @layer normalize, global, base, adds, mods, extend; */
    @layer normalize, global, base, adds, mods, extend;

    /* ? Component styles */
    @layer base {
        .router-provider {
            flex-grow: 1;
            display: flex;
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
            gap: 5px;
        }
        .error {
            color: red;
            pointer-events: none;
        }
    }

    /* ? Prop styles */
    /* Задавать css слой, чтоб использовать его внутри дочернего компонента */
    @layer extend {
        .router-provider {
            :global(.router-provider__title-ui-one) {

            }
            :global(.router-provider__title-ui-two) {

            }
        }
    }
</style>
