<script lang="ts">
    import {onMount} from "svelte";

    import UsersApi from "@shared/api/UsersApi";
    import TitleUI from "@shared/ui/TitleUI/TitleUI.svelte";
    import type { TSizeProp } from "@shared/ui";

    let users: any;

    onMount(async () => {
        users = await UsersApi.getAllUsers();
    })

    /* ? Props */
    /* По возможности типизируем пропсы */
    const usersSizeProp: TSizeProp = "X";
    const userListSizeProp: TSizeProp = "M";
</script>

<div class="users-page">
    <TitleUI levelProp={1} sizeProp={usersSizeProp} classExtendProp="users-page__title-ui-one">Find Users Page</TitleUI>
    {#if users}
        <TitleUI levelProp={3} sizeProp={userListSizeProp} classExtendProp="users-page__title-ui-two">User List</TitleUI>
        {#each users as user}
            <div class="user-container">
                <div>id: {user.id},</div>
                <div>name: {user.username}</div>
            </div>
        {/each}
    {/if}
</div>

<style lang="scss">
    /* Базово слои должны соответствовать каскадности css (если поменялись местами оставлять TO:DO) */
    /* extend - взят из родительского компонента */
    /* Порядок: @layer normalize, global, base, adds, mods, extend; */
    @layer normalize, global, base, adds, mods, extend;

    /* ? Component styles */
    @layer base {
        .users-page {
            flex-grow: 1;

            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .user-container {
            display: flex;
            align-items: center;
        }
    }

    /* ? Prop styles */
    /* Задавать css слой, чтоб использовать его внутри дочернего компонента */
    @layer extend {
        .users-page {
            :global(.users-page__title-ui-one) {
                margin-bottom: 10px;
            }
            :global(.users-page__title-ui-two) {
                margin-bottom: 8px;
            }
        }
    }
</style>
