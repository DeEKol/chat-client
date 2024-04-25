import {userStore} from "../../app/providers/StoreProvider/store";

export default class AuthApi {
    static async login(username: string, password: string) {
        const response = await fetch("http://127.0.0.1:7000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });
        const data = await response.json();

        return data;
    }

    static async checkAuth() {
        const response = await fetch("http://127.0.0.1:7000/api/check", {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        const data = await response.json();

        return data;
    }

    static async logout() {
        localStorage.removeItem("token")
        userStore.set({
            id: undefined,
            username: "",
        })
    }
}