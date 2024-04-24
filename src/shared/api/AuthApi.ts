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

        // console.log(data)
        // localStorage.setItem("token", data.token)

        return data;
    }

    static async logout() {
        localStorage.removeItem("token")
    }
}