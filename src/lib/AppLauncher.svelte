<script lang="ts">
	import AppIcon from "$lib/AppIcon.svelte";
</script>

<div class="apps">
	{#each { length: 5 } as app}
		<AppIcon display_name="App" />
	{/each}
</div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	.apps {
		align-content: flex-start;
		align-items: flex-start;
		display: flex;
		flex-wrap: wrap;
		gap: 4rem;
		height: 100%;
		justify-content: center;
		padding: 1rem;
		width: 100%;
	}
</style>
