<script lang="ts">
	import type { Component } from "svelte";

	import StatusBar from "./StatusBar.svelte";

	let {
		// The app that is currently being displayed.
		app,
	}: {
		// TODO: Create an interface to represent apps.
		app: Component;
	} = $props();

	const AppComponent = $derived(app);
</script>

<div class="screen">
	<StatusBar />

	<AppComponent />

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
