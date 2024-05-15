<script>
    export let level = 1;
    export let classes;
    export let text;
</script>

{@html `
  <h${level} class="${classes}">
    ${text}
  </h${level}>
`}



