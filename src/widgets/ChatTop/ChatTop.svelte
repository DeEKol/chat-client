<script lang="ts">
    import RoomApi from "@shared/api/RoomApi";
    import { TitleUI } from "@shared/ui";
    import type { TSizeProp } from "@shared/ui";

    export let roomTitle: string;
    export let userId: number;
    export let room: any;
    export let messagesArr: any;


    let findMsg: string = "";

    const onUpdateRoom = async (roomId: number, userId: number) => {
        if (roomId && userId) {
            const roomUpd = await RoomApi.updateRoom(roomId, userId);
        }
    }

    const onFindMsg = () => {
        const foundObj = messagesArr.find(obj => obj.text.includes(findMsg))

        setTimeout(() => {
            const el: HTMLElement | null = document.getElementById(foundObj.id);
            el?.scrollIntoView({behavior: "smooth", block: "center", inline: "start"})
        }, 10)
    }

    const titleSizeProp: TSizeProp = "X";
</script>

<div class="chat-top">
    <TitleUI levelProp={2} sizeProp={titleSizeProp} classExtendProp="chat-top__title-ui">
        Room: {roomTitle}
    </TitleUI>
    <div>
        Users in room:
        {#each room.users as user}
            <span>{user.username}, </span>
            {/each}
    </div>
    <form on:submit|preventDefault method="post">
        <label>
            <input name="userId" placeholder="user id" type="text" bind:value={userId}>
        </label>
        <button on:click={() => onUpdateRoom(room.id, userId)}>Add User In Room</button>
    </form>
    <div>
        <input placeholder="Message" bind:value={findMsg}>
        <button placeholder="Find msg" on:click={onFindMsg}>Find</button>
    </div>
</div>

<style lang="scss">
    /* Базово слои должны соответствовать каскадности css (если поменялись местами оставлять TO:DO) */
    /* extend - взят из родительского компонента */
    /* Порядок: @layer normalize, global, base, adds, mods, extend; */
    @layer normalize, global, base, adds, mods, extend;

    /* ? Component styles */
    @layer base {
        .chat-top {
            background: #58718c;

            padding: 7px;
            border-top-right-radius: 10px;

            display: flex;
            flex-direction: column;
            align-items: end;
            gap: 5px;
        }
    }

    /* ? Prop styles */
    /* Задавать css слой, чтоб использовать его внутри дочернего компонента */
    @layer extend {
        .chat-top :global(.chat-top__title-ui) {
            /*color: red;*/
            //margin-bottom: 10px;
        }
    }
</style>
