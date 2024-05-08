<script lang="ts">
    import HomePage from "../pages/HomePage/HomePage.svelte";
    import {userStore} from "./providers/StoreProvider/store";
    import Auth from "../features/Auth/Auth.svelte";
    import AuthApi from "../shared/api/AuthApi.js";
    import {onMount} from "svelte";
    import Header from "../widgets/Header";

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
    <Header id={$userStore.id} username={$userStore.username} />
    {#if !!$userStore.id && !!$userStore.username}
        <HomePage />
        {:else}
        <Auth />
    {/if}
    <footer class="footer" id="bottom"></footer>
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
    .footer {
        margin: 10px;
    }

    .red {
        color: red;
    }
</style>
