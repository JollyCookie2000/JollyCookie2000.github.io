<script lang="ts">
	import type { Component } from 'svelte';

	import StatusBar from './StatusBar.svelte';
	import type AppManagerAction from './AppManagerAction';

	let {
		// The app that is currently being displayed.
		app
	}: {
		// TODO: Create an interface to represent apps.
		app: Component;
	} = $props();

	const AppComponent = $derived(app);

	function app_manager_exec(action: AppManagerAction) {
		app = action.app_component;
	}
</script>

<div class="screen">
	<StatusBar />

	<AppComponent {app_manager_exec} />

	<!-- TODO: Add navigation buttons, Android-style. -->
</div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	.screen {
		/* https://unsplash.com/photos/a-bunch-of-different-shapes-and-sizes-on-a-wall-3tNqoO_ReHQ */
		background-image: url('/wallpaper.jpg');
		background-size: cover;
		height: 100%;
		width: 100%;
	}
</style>
