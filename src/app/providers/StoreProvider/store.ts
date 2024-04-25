import {writable} from "svelte/store";

type TUser = {
    id: number | undefined;
    username: string;
}

export const userStore = writable<TUser>({
    id: undefined,
    username: "",
});