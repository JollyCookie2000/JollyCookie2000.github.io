<script lang="ts">
	import type { Component } from 'svelte';

	import AppIcon from '$lib/AppIcon.svelte';
	import AppManagerAction from '$lib/AppManagerAction';
	import LinkApp from '$lib/apps/LinkApp.svelte';
	import type { AppOptions } from './AppOptions';
	import BrowserApp from './BrowserApp.svelte';
	import TentsApp from './TentsApp.svelte';

	let {
		app_manager_exec
	}: {
		app_manager_exec: (action: AppManagerAction) => void;
	} = $props();

	const apps = [
		// TODO: Make this into a class.
		{
			app_component: BrowserApp,
			display_name: 'About Me',
			icon: 'icon_missing.svg',
			options: new Map(
				Object.entries({
					url: 'about.html'
				})
			)
		},
		{
			app_component: LinkApp,
			display_name: '🔗 LinkedIn',
			icon: 'icon_linkedin.svg',
			options: new Map(
				Object.entries({
					url: 'https://www.linkedin.com/in/lorenzo-adam-piazza'
				})
			)
		},
		{
			app_component: LinkApp,
			display_name: '🔗 BitBucket',
			icon: 'icon_bitbucket.png',
			options: new Map(
				Object.entries({
					url: 'https://bitbucket.org/lorenzo_adam_piazza'
				})
			)
		},
		{
			app_component: LinkApp,
			display_name: '🔗 GitHub',
			icon: 'icon_github.svg',
			options: new Map(
				Object.entries({
					url: 'https://github.com/JollyCookie2000'
				})
			)
		},
		{
			app_component: TentsApp,
			display_name: 'Tents',
			icon: 'icon_tents.png',
			options: null
		},
		{
			app_component: BrowserApp,
			display_name: 'Blog',
			icon: 'icon_blog.svg',
			options: new Map(
				Object.entries({
					url: 'blog/index.html'
				})
			)
		}
	];

	function on_icon_click(app_component: Component, app_options: AppOptions) {
		app_manager_exec(new AppManagerAction(app_component, app_options));
	}
</script>

<div class="apps">
	{#each apps as app}
		{@const onclick = () => on_icon_click(app.app_component, app.options)}
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
