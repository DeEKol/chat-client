<script lang="ts">
    import Rooms from "../../entities/Rooms/Rooms.svelte";
    import Messages from "../../entities/Messages/Messages.svelte";
    import Users from "../../entities/Users/Users.svelte";

</script>

<div class="wrapper">
    <h1>Home Page</h1>
    <Users />
    <Rooms />
    <Messages />
</div>

<style>
    .wrapper {
        flex-grow: 1;
    }
</style>