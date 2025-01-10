<script lang="ts">
	import type { Component } from "svelte";

	import AppIcon from "$lib/AppIcon.svelte";
	import LinkApp from "$lib/apps/LinkApp.svelte";

	import AppManagerAction from "./AppManagerAction";

	let {
		app_manager_exec,
	}: {
		app_manager_exec: (action: AppManagerAction) => void;
	} = $props();

	const apps = [
		{ // Test App
			app_component: LinkApp,
			display_name: "🔗 Test App",
			icon: 'favicon.ico',
		}
	];

	function on_icon_click(app_component: Component) {
		app_manager_exec(new AppManagerAction(app_component));
	}
</script>

<div class="apps">
	{#each apps as app}
		{@const onclick = () => on_icon_click(app.app_component)}
		<AppIcon display_name={app.display_name} icon={app.icon} {onclick} />
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
