<script lang="ts">
    import {onMount} from "svelte";

    import Header from "@widgets/Header";
    import Auth from "@features/Auth";
    import AuthApi from "@shared/api/AuthApi.js";
    import RoutesProvider from "./providers/RoutesProvider/ui/RoutesProvider.svelte";
    import { userStore } from "./providers/StoreProvider/store";

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

<div class="layout">
    <Header id={$userStore.id} username={$userStore.username} />
    {#if !!$userStore.id && !!$userStore.username}
<!--        <HomePage />-->
        <RoutesProvider />
        {:else}
        <Auth />
    {/if}
    <footer class="footer" id="bottom"></footer>
</div>

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
