<script>
    import H1 from "./TitleLevel/H1.svelte";
    import H2 from "./TitleLevel/H2.svelte";
    import H3 from "./TitleLevel/H3.svelte";
    import H4 from "./TitleLevel/H4.svelte";

    export let levelProp = 1;
    export let classes = H1;

    const component = {
        1: H1,
        2: H2,
        3: H3,
        4: H4,
    }

    const Component = component[levelProp]
</script>

<Component {classes}>
    <slot></slot>
</Component>
