<script lang="ts">
    import {messageStore, userStore} from "../../app/providers/StoreProvider/store.js";

    export let messagesArr: any;

    const onEditBtn = (event: any) => {
        const msgId = event.currentTarget.getAttribute("id");
        $messageStore.upd = Number(msgId);
        console.log($messageStore.upd)
    }

    $: console.log($messageStore.upd)
    $: console.log(messagesArr)
</script>

<div class="wrapper">
    {#if messagesArr}
        {#each messagesArr as message}
            {#if message.type === "text"}
                <div class="message-container" class:left={message.user.id !== $userStore.id} class:edit={$messageStore.upd === message.id}>
                    <div class="message-top">
                        {#if message.user.id !== $userStore.id}
                            <div class="author">{message.user.username}</div>
                        {/if}
                        {#if message.isEdited}
                            <div class="edited">Edited</div>
                        {/if}
                    </div>
                    <div class="text">{message.text}</div>
                    <div class="date">{new Date(message.time).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
                    <div class="message-bottom">
                        {#if message.user.id === $userStore.id}
                        <button id={message.id} class="edit-btn" on:click={(event) => onEditBtn(event)}>edit</button>
                            {/if}
                    </div>
                </div>
            {:else if message.type === "img"}
                <img class="message-container" class:left={message.user.id !== $userStore.id} src={message.text} alt="img">
            {/if}
        {/each}
    {/if}
</div>

<style>
    .wrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        background: #bdbcce;
        padding: 4px;
        /*border-radius: 10px;*/

        /*overflow: auto;*/
    }
    .message-container {
        display: flex;
        flex-direction: column;
        min-width: 20%;
        max-width: 80%;
        align-self: flex-end;

        background: rgba(64, 40, 185, 0.3);

        padding: 4px;

        border-radius: 10px;

        margin-bottom: 5px;
    }
    .edit {
        background: rgba(0, 0, 0, 0.5);
    }
    .text {
      /*font-size: 10px;*/
      text-align: right;
      /*color: #747bff;*/
      word-break: break-all;
    }
    .message-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .edited {
        font-size: 10px;
        text-align: right;
        color: #4a50a6;
    }
    .date {
      font-size: 10px;
      text-align: right;
      color: #32333b;
    }
    .left {
        align-self: flex-start;
    }
    .author {
      color: #4a50a6;
    }
    .edit-btn {
        padding: 4px;
        font-size: 12px;
    }
</style>
