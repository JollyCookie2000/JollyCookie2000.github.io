<script lang="ts">
	import { scale } from 'svelte/transition';

	import AppIcon from '$lib/AppIcon.svelte';
	import StatusBar from '$lib/StatusBar.svelte';

	class App {
		public readonly display_name: string;

		constructor(display_name: string) {
			this.display_name = display_name;
		}
	}

	const apps: App[] = [
		new App('About Me'),
		new App('Personal Blog'),
		new App('App 1'),
		new App('App 2'),
		new App('App 3'),
		new App('App 4'),
		new App('App 5'),
	];

	let is_app_open: boolean = false;
</script>

<div class="homepage">
	<StatusBar />

	<div class="apps">
		{#each apps as app}
			{@const display_name = app.display_name}
			<AppIcon {display_name} on_click={() => { is_app_open = true; }} />
		{/each}
	</div>
	<div class="dock">

	</div>

	{#if is_app_open}
		<div class="open-app" transition:scale></div>
	{/if}
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
		height: 500px;
		justify-content: center;
		padding: 1rem;
	}

	.homepage {
		background-image: url('https://wonderfulengineering.com/wp-content/uploads/2016/01/nature-wallpapers-33.jpg');
		height: 100%;
	}

	.open-app {
		background-color: rgba(0, 0, 0, 0.9);
		height: 100%;
		left: 0px;
		position: fixed;
		top: 0px;
		width: 100%;
		z-index: 10;
	}
</style>
