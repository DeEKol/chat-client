<script lang="ts">
    import HomePage from "../pages/HomePage/HomePage.svelte";
    import {userStore} from "./providers/StoreProvider/store";
    import Auth from "../features/Auth/Auth.svelte";
    import AuthApi from "../shared/api/AuthApi.js";
    import {onMount} from "svelte";

    onMount(async () => {
        try {
            const user = await AuthApi.checkAuth();
            userStore.set(user[0]);
        } catch (e) {
            userStore.set({
                id: undefined,
                username: "",
            });
        }
    });

    const onLogout = () => {
        AuthApi.logout();
    }
</script>

<main class="layout">
    <header class="header" id="top">
    {#if !!$userStore.id && !!$userStore.username}
        <h4>id: {$userStore.id} username: {$userStore.username}</h4>
        <div>
            <button on:click={() => location.reload()}>Reload Page</button>
            <button on:click={() => onLogout()}>Logout</button>
        </div>
        {:else}
        <h4 class="red">Register Now!!!</h4>
    {/if}
    </header>
    {#if !!$userStore.id && !!$userStore.username}
        <HomePage />
        {:else}
        <Auth />
    {/if}
    <footer id="bottom">footer</footer>
</main>

<style>
    .layout {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: inherit;
    }
    .header {
        padding: 10px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: end;

        background: #19506c;

        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .red {
        color: red;
    }
</style>
