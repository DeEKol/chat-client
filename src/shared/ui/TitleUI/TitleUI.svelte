<script lang="ts">
    import DynamicTitle from "./DynamicTitle.svelte";
    import type { TSizeProp } from "./types";
    import { classNames } from "../../lib";

    export let classExtendProp: string = "";
    export let levelProp: number = 1;
    export let sizeProp: TSizeProp = "M";
</script>

<DynamicTitle
        {levelProp}
        classes={classNames("title-ui", {"active": true}, [classExtendProp, sizeProp])}
>
    <slot />
</DynamicTitle>

<style lang="scss">
    /* Базово слои должны соответствовать каскадности css (если поменялись местами оставлять TO:DO) */
    /* extend - взят из родительского компонента */
    /* Порядок: @layer global, base, adds, mods, extend; */
    @layer global, base, adds, mods, extend;

    @layer base {
        :global(.title-ui) {
            /*padding: 12px 8px;*/
        }
    }
    @layer adds {
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
    }
    @layer mods {
        :global(.title-ui.active) {
            /*color: green;*/
        }
    }
</style>
