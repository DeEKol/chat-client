<script lang="ts">
    import UsersApi from "../../shared/api/UsersApi";
    import AuthApi from "../../shared/api/AuthApi";
    import {userStore} from "../../app/providers/StoreProvider/store";

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
</script>

<div class="wrapper">
    <h4>Auth</h4>
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
</div>

<style>
    .wrapper {
        flex-grow: 1;
    }
</style>