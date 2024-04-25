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
</script>

<main class="layout">
  <header>
    <h2>header</h2>
    {#if !!$userStore.id && !!$userStore.username}
      <h4>id: {$userStore.id} username: {$userStore.username}</h4>
      {:else}
      <h4 class="red">Register Now!!!</h4>
    {/if}
  </header>
  {#if !!$userStore.id && !!$userStore.username}
    <HomePage />
    {:else}
    <Auth />
  {/if}
  <footer>footer</footer>
</main>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: inherit;
  }

  .red {
    color: red;
  }
</style>
