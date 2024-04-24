export default class RoomApi {
    static async getAllRooms() {
        const response = await fetch("http://127.0.0.1:7000/api/rooms", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        const data = await response.json();
        return data;
    }

    static async getRoom(id: number) {
        const response = await fetch("http://127.0.0.1:7000/api/room/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        const data = await response.json();
        return data;
    }

    static async createRoom(name: string) {
        const response = await fetch("http://127.0.0.1:7000/api/room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                name: name,
            })
        });
        const data = await response.json();

        return data;
    }

    static async deleteRoom(id: number) {
        const response = await fetch("http://127.0.0.1:7000/api/room/" + id, { method: "DELETE" });
        const data = await response.json();
        return data;
    }

    static async getUserInRoom(id: number) {
        const response = await fetch("http://127.0.0.1:7000/api/roomUsers/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        const data = await response.json();
        return data;
    }

    static async updateRoom(roomId: number, userId: number) {
        const response = await fetch("http://127.0.0.1:7000/api/room", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                roomId: roomId,
                userId: userId,
            })
        });
        const data = await response.json();

        return data;
    }
}