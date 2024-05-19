<script lang="ts">
    import {userStore} from "@app/providers/StoreProvider/store";
    import UsersApi from "@shared/api/UsersApi";
    import AuthApi from "@shared/api/AuthApi";
    import { TitleUI } from "@shared/ui";
    import type { TSizeProp } from "@shared/ui";

    let username: string;
    let password: string;

    const onCreateUser = async (username: string, password: string) => {
        console.log("create");
        console.log(username);
        if (username) {
            const user = await UsersApi.createUser(username, password);
            console.log(user)
        }
    }

    const onLogin = async (username: string, password: string) => {
        console.log("login");
        console.log(username);
        if (username && password) {
            const data = await AuthApi.login(username, password);

            if (data) {
                const id = data.user.id;
                const username = data.user.username;
                localStorage.setItem("token", data.token);
                userStore.set({id, username});
                location. reload();
            }
            console.log(data);
        }
    }

    /* ? Props */
    /* По возможности типизируем пропсы */
    const titleSizeProp: TSizeProp = "M";
</script>

<main class="auth">
    <TitleUI classExtendProp="auth__title-ui" levelProp={4} sizeProp={titleSizeProp}>
        Auth
    </TitleUI>
    <form on:submit|preventDefault method="post">
        <label>
            username
            <input name="username" type="text" bind:value={username}>
        </label>
        <label>
            password
            <input name="password" type="password" bind:value={password}>
        </label>
        <button on:click={() => onLogin(username, password)}>Sign in</button>
        <button on:click={() => onCreateUser(username, password)}>Sign up</button>
    </form>
</main>

<style>
    /* Базово слои должны соответствовать каскадности css (если поменялись местами оставлять TO:DO) */
    /* extend - взят из родительского компонента */
    /* Порядок: @layer normalize, global, base, adds, mods, extend; */
    @layer normalize, global, base, adds, mods, extend;

    /* ? Component styles */
    @layer base {
        .auth {
            flex-grow: 1;
        }
    }

    /* ? Prop styles */
    /* Задавать css слой, чтоб использовать его внутри дочернего компонента */
    @layer extend {
        .auth :global(.auth__title-ui) {
            /*color: red;*/
            /*margin-bottom: 10px;*/
        }
    }
</style>
