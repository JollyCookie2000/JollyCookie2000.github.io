<script lang="ts">
	import AppManagerAction from '$lib/AppManagerAction';
	import type { AppOptions } from '$lib/AppOptions';

	let {
		app_manager_exec,
		app_options
	}: {
		app_manager_exec: (action: AppManagerAction) => void;
		app_options?: AppOptions;
	} = $props();

	const url: string = app_options?.get('url');
</script>

<div class="app">
	<iframe title={url} src={url} frameborder="0"></iframe>
</div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	iframe {
		height: 95%;
		width: 100%;
	}

	.app {
		background-color: #dcdde1;
		height: 100%;
		width: 100%;
	}
</style>
