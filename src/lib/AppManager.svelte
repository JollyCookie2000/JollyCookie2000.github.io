<script lang="ts">
	import type { Component } from 'svelte';

	import StatusBar from '$lib/StatusBar.svelte';
	import type AppManagerAction from '$lib/AppManagerAction';
	import type { AppOptions } from '$lib/AppOptions';
	import AppLauncher from './AppLauncher.svelte';

	let {
		// The app that is currently being displayed
		app,
		// The startup options for the current app
		app_options
	}: {
		// TODO: Create an interface to represent app components.
		app: Component;
		app_options?: AppOptions;
	} = $props();

	const AppComponent = $derived(app);

	function app_manager_exec(action: AppManagerAction) {
		app = action.app_component;
		app_options = action.app_options;
	}
</script>

<div class="screen">
	<div class="space-status">
		<StatusBar />
	</div>

	<div class="space-app">
		<AppComponent {app_manager_exec} {app_options} />
	</div>

	<div class="space-nav">
		<button class="button-home" onclick={() => (app = AppLauncher)}>
			<img src="house.svg" alt="Home icon" />
		</button>
	</div>
</div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	.button-home {
		background-color: transparent;
	}

	.button-home img {
		height: 100%;
	}

	.screen {
		/* https://unsplash.com/photos/a-bunch-of-different-shapes-and-sizes-on-a-wall-3tNqoO_ReHQ */
		background-image: url('/wallpaper.jpg');
		background-size: cover;
		height: 100%;
		width: 100%;
	}

	.space-app {
		height: 92%;
	}

	.space-nav {
		backdrop-filter: blur(8px);
		background-color: rgba(50, 50, 50, 0.5);
		box-shadow: 0px 0px 32px rgba(50, 50, 50, 1);
		display: flex;
		height: 5%;
		justify-content: center;
		width: 100%;
	}

	.space-status {
		height: 3%;
	}
</style>
