<!-- <script lang="ts">
	import EvidenceGrid from '$lib/EvidenceGrid.svelte';
	import FlashingText from '$lib/FlashingText.svelte';
	import ProjectList from '$lib/ProjectList.svelte';
	import { titles, paragraphs, projects, evidenceData, footerData } from '$lib/utils/content';
</script>

<svelte:head>
	<title>i.e.,</title>
	<meta name="description" content="Cursed tech for mischievous togetherness" />
</svelte:head>

<section class="subtitle-section">
	<FlashingText
		tag="h2"
		--margin="0 0 0.7rem 0"
		content={titles.subtitle}
		flashInterval={1100}
		flashDuration={200}
		glitchInterval={3000}
		glitchDuration={70}
	/>
	<p>
		{@html paragraphs.intro}
	</p>
</section>

<section class="manifesto-section">
	<FlashingText
		tag="h2"
		--margin="0 0 0.7rem 0"
		content={titles.manifesto}
		flashInterval={1500}
		flashDuration={400}
		glitchInterval={4000}
		glitchDuration={60}
	/>
	<p>
		{@html paragraphs.manifesto}
	</p>
</section>

<section class="evidence-section">
	<FlashingText
		tag="h2"
		--margin="0 0 0.7rem 0"
		content={titles.evidence}
		flashInterval={800}
		flashDuration={100}
		glitchInterval={2500}
		glitchDuration={50}
	/>
	<EvidenceGrid evidences={evidenceData} />
</section>

<aside>
	<FlashingText
		tag="h2"
		--margin="0 0 2rem 0"
		content={titles.location}
		flashInterval={1100}
		flashDuration={200}
		glitchInterval={3000}
		glitchDuration={70}
	/>
	<h3>Now open to:</h3>
	<ProjectList projectDescriptionList={projects} />
</aside>

<style>
	.subtitle-section {
		margin: 0 0 15rem 0;
	}

	.manifesto-section {
		margin: 0 0 7rem 0;
	}

	.evidence-section {
		margin: 0 0 15rem 0;
	}
</style> -->

<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';

	export let data;
</script>

<svelte:head>
	<title>i.e.,</title>
	<meta name="description" content="Cursed tech for mischievous togetherness" />
</svelte:head>

<SliceZone slices={data.page.data.slices} {components} />
