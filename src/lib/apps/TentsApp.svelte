<script lang="ts">
	import TreesTents from 'tents-svelte';
	
	import type AppManagerAction from '$lib/AppManagerAction';
	import type { AppOptions } from '$lib/AppOptions';

	let {
		app_manager_exec,
		app_options
	}: {
		app_manager_exec: (action: AppManagerAction) => void;
		app_options?: AppOptions;
	} = $props();
</script>

<div class="app">
	<!-- <a href="https://www.flaticon.com/free-icons/tent" title="tent icons">Tent icons created by Freepik - Flaticon</a> -->
	<TreesTents />
</div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	.app {
		background-color: #ecf0f1;
		height: 100%;
		padding: 1rem;
		width: 100%;
	}
</style>
