<script lang="ts">
	import AppLauncher from '$lib/AppLauncher.svelte';
	import AppManager from '$lib/AppManager.svelte';
</script>

<div class="window">
	<AppManager app={AppLauncher} />
</div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	.window {
		height: 100%;
		width: 100%;
	}
</style>
