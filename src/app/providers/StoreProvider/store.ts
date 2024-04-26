import {writable} from "svelte/store";

type TUser = {
    id: number | undefined;
    username: string;
}

type TMessage = {
    upd: number | undefined | null;
}

export const userStore = writable<TUser>({
    id: undefined,
    username: "",
});

export const messageStore = writable<TMessage>({
    upd: undefined,
});