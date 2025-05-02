<script lang="ts">
  type Evidence = {
    title: string;
    description: string;
    status: string;
  };

  let { evidences = [] }: { evidences?: Evidence[] } = $props();
</script>

<div class="evidence-grid">
  {#each evidences as evidence}
    <div class="evidence-item">
      <h3>{evidence.title}</h3>
      <p>{evidence.description}</p>
      <span class="status">{evidence.status}</span>
    </div>
  {/each}
</div>

<style>
  .evidence-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem 1rem;
  }

  .evidence-item h3 {
    margin: 0 0 1.5rem 0;
  }

  .evidence-item p {
    margin: 0 0 0.8rem 0;
  }

  .status {
    font-family: "Inter";
    font-weight: 300;
    font-style: italic;
    font-size: 1.3rem;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: #0b0b0b;
  }

  @media (max-width: 768px) {
    .evidence-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
