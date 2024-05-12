<script lang="ts">
    export let classExtend: string = "default";
    export let priority: number = 1;
    export let size: "S" | "M" | "L" | "X" = "M";

    const classes = `${classExtend} ${size}`;
</script>

{#if priority === 1}
    <h1 class={classes}>
        <slot />
    </h1>
    {:else if priority === 2}
    <h2 class={classes}>
        <slot />
    </h2>
    {:else if priority === 3}
    <h3 class={classes}>
        <slot />
    </h3>
    {:else if priority === 4}
    <h4 class={classes}>
        <slot />
    </h4>
{/if}

<style>
    .S {
        font-size: 14px;
        line-height: 16px;
    }
    .M {
        font-size: 16px;
        line-height: 20px;
    }
    .L {
        font-size: 22px;
        line-height: 28px;
    }
    .X {
        font-size: 28px;
        line-height: 36px;
    }
</style>
