<script lang="ts">
    import AuthApi from "@shared/api/AuthApi";
    import { TitleUI } from "@shared/ui";
    import type { TSizeProp } from "@shared/ui";

    export let id: number;
    export let username: string;

    const onLogout = () => {
        AuthApi.logout();
    }

    /* ? Props */
    /* По возможности типизируем пропсы */
    const sizeProp: TSizeProp = "M";
</script>

<header class="header" id="top">
    {#if !!id && !!username}
        <TitleUI classExtendProp="header__title-ui" levelProp={3} {sizeProp}>id: {id} username: {username}</TitleUI>
        <div>
            <button on:click={() => location.reload()}>Reload Page</button>
            <button on:click={() => onLogout()}>Logout</button>
        </div>
    {:else}
        <TitleUI classExtendProp="header__title-ui" levelProp={3} {sizeProp}>
            Register Now!!!
        </TitleUI>
    {/if}
</header>

<style lang="scss">
    /* Базово слои должны соответствовать каскадности css (если поменялись местами оставлять TO:DO) */
    /* extend - взят из родительского компонента */
    /* Порядок: @layer normalize, global, base, adds, mods, extend; */
    @layer normalize, global, base, adds, mods, extend;

    @layer base {
        /* ? Component styles */
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
    }

    /* ? Prop styles */
    /* Задавать css слой, чтоб использовать его внутри дочернего компонента */
    @layer extend {
        .header :global(.header__title-ui) {
            /*color: red;*/
            margin-bottom: 10px;
        }
    }
</style>
