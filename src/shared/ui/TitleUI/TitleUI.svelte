<script lang="ts">
    import DynamicTitle from "./DynamicTitle.svelte";

    export let classExtend: string = "default";
    export let level: number = 1;
    export let size: "S" | "M" | "L" | "X" = "M";

    const classes = `title-ui ${classExtend} ${size}`;

    let data;
    $: if (data?.innerText) data.remove();
</script>

<DynamicTitle {level} {classes} text={data?.innerText}></DynamicTitle>
<span contenteditable="true" bind:this={data} class="hide"><slot /></span>

<style>
    .hide {
        display: none;
    }
    :global(.title-ui.S) {
        font-size: 14px;
        line-height: 16px;
    }
    :global(.title-ui.M) {
        font-size: 16px;
        line-height: 20px;
    }
    :global(.title-ui.L) {
        font-size: 22px;
        line-height: 28px;
    }
    :global(.title-ui.X) {
        font-size: 28px;
        line-height: 36px;
    }
</style>
