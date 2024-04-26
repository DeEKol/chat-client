<script lang="ts">
    import {onMount} from "svelte";
    import UsersApi from "../../shared/api/UsersApi";

    let users: any;

    onMount(async () => {
        users = await UsersApi.getAllUsers();
    })
</script>

<div class="wrapper">
    <h1>Find Users Page</h1>
    {#if users}
        <h3>User List</h3>
        {#each users as user}
            <div class="user-container">
                <div>id: {user.id},</div>
                <div>name: {user.username}</div>
            </div>
        {/each}
    {/if}
</div>

<style>
    .wrapper {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .user-container {
        display: flex;
        align-items: center;
    }
</style>
