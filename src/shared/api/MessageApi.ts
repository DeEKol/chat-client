export default class MessageApi {
    static async getAllMessages() {
        const response = await fetch("http://127.0.0.1:7000/api/messages", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        const data = await response.json();
        return data;
    }

    static async getAllMessagesByRoom(roomId: number) {
        const response = await fetch("http://127.0.0.1:7000/api/messagesByRoom/" + roomId, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        const data = await response.json();
        return data;
    }

    static async getMessage(id: number) {
        const response = await fetch("http://127.0.0.1:7000/api/message/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        const data = await response.json();
        return data;
    }

    static async createMessage(text: string, roomId: number, userId: number) {
        const response = await fetch("http://127.0.0.1:7000/api/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                text: text,
                roomId: roomId,
                userId: userId,
                time: new Date().toString(),
            })
        });
        const data = await response.json();

        return data;
    }

    static async deleteMessage(id: number) {
        const response = await fetch("http://127.0.0.1:7000/api/message/" + id, { method: "DELETE" });
        const data = await response.json();
        return data;
    }
}