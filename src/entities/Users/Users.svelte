<script lang="ts">
    import UsersApi from "../../shared/api/UsersApi";
    import AuthApi from "../../shared/api/AuthApi";
    import {userStore} from "../../app/providers/StoreProvider/store";

    let userId: number;
    let username: string;
    let password: string;

    const onGetAllUsers = async () => {
        const users = await UsersApi.getAllUsers();
        console.log(users);
    }

    const onGetUser = async (id: number) => {
        console.log(id);
        if (id) {
            const user = await UsersApi.getUser(id);
            console.log(user);
        }
    }

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
            }
            console.log(data);
        }
    }

    const onDeleteUser = async (id: number) => {
        console.log("delete");
        console.log(id);
        if (id) {
            const user = await UsersApi.deleteUser(id);
            console.log(user)
        }
    }

    const onLogout = () => {
        AuthApi.logout();
    }

    const onCheckAuth = async () => {
        try {
            console.log("check");
            // if (id) {
            const user = await AuthApi.checkAuth();

            console.log(user);

            userStore.set(user[0]);
        } catch (e) {
            userStore.set({
                id: undefined,
                username: "",
            });
            console.warn(e);
        }
    }
</script>

<div class="wrapper">
    <h2>Users</h2>
    <button on:click={() => onGetAllUsers()}>Get All Users</button>
    <form on:submit|preventDefault method="get">
        <label>
            id user
            <input name="user" type="number" bind:value={userId}>
        </label>
        <button on:click={() => onGetUser(userId)}>Get User</button>
    </form>
    <label>
        id user
        <input name="user" type="number" bind:value={userId}>
        <button on:click={() => onDeleteUser(userId)}>Delete User</button>
    </label>
    <form on:submit|preventDefault method="post">
        <label>
            username
            <input name="username" type="text" bind:value={username}>
        </label>
        <label>
            password
            <input name="password" type="password" bind:value={password}>
        </label>
        <button on:click={() => onCreateUser(username, password)}>Create User</button>
    </form>

    <form on:submit|preventDefault method="post">
        <label>
            username
            <input name="username" type="text" bind:value={username}>
        </label>
        <label>
            password
            <input name="password" type="password" bind:value={password}>
        </label>
        <button on:click={() => onLogin(username, password)}>Login</button>
    </form>
    <button on:click={() => onLogout()}>Logout</button>
    <button on:click={() => onCheckAuth()}>Check Auth</button>
</div>

<style>
    .wrapper {
        flex-grow: 1;
    }
</style>