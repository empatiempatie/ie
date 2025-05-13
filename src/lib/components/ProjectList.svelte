<script lang="ts">
	type Props = {
		projectDescriptionList?: string[];
	};

	let { projectDescriptionList = [''] }: Props = $props();
</script>

<aside>
	<h3>Now open to:</h3>
	<ul>
		{#each projectDescriptionList as projectDescription}
			<li>
				{projectDescription}
			</li>
		{/each}
	</ul>
</aside>

<style>
	ul {
		list-style: none;
		margin: 0 0 3rem 0;
		padding: 0;
	}

	li:before {
		content: '→ ';
	}
</style>
