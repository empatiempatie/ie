<script lang="ts">
  let { projectDescriptionList = [""] }: { projectDescriptionList?: string[] } =
    $props();
</script>

<ul>
  {#each projectDescriptionList as projectDescription}
    <li>
      {projectDescription}
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    margin: 0 0 3rem 0;
    padding: 0;
  }

  li:before {
    content: "→ ";
  }
</style>
