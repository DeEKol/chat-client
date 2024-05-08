<script lang="ts">
    import AuthApi from "../../../shared/api/AuthApi";

    export let id: number;
    export let username: string;

    const onLogout = () => {
        AuthApi.logout();
    }
</script>

<header class="header" id="top">
    {#if !!id && !!username}
        <h4>id: {id} username: {username}</h4>
        <div>
            <button on:click={() => location.reload()}>Reload Page</button>
            <button on:click={() => onLogout()}>Logout</button>
        </div>
    {:else}
        <h4 class="red">Register Now!!!</h4>
    {/if}
</header>

<style>
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
</style>
