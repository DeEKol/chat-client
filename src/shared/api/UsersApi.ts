export default class UsersApi {
    static async getAllUsers() {
        const response = await fetch("http://127.0.0.1:7000/api/users", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        const data = await response.json();
        return data;
    }

    static async getUser(id: number) {
        const response = await fetch("http://127.0.0.1:7000/api/user/" + id);
        const data = await response.json();
        return data;
    }

    static async createUser(username: string, password: string) {
        const response = await fetch("http://127.0.0.1:7000/api/user", {
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

        console.log(data)
        localStorage.setItem("token", data.token)

        return data;
    }

    static async deleteUser(id: number) {
        const response = await fetch("http://127.0.0.1:7000/api/user/" + id, { method: "DELETE" });
        const data = await response.json();
        return data;
    }
}