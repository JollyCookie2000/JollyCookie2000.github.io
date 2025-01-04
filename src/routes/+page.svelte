<script lang="ts">
	import AppIcon from '$lib/AppIcon.svelte';
	import StatusBar from '$lib/StatusBar.svelte';
	import LinkAppIcon from '$lib/LinkAppIcon.svelte';

	class App {
		public readonly display_name: string;

		constructor(display_name: string) {
			this.display_name = display_name;
		}
	}

	const apps: App[] = [
		new App('About Me'),
		new App('Personal Blog'),
	];
</script>

<div class="homepage">
	<StatusBar />

	<div class="apps">
		{#each apps as app}
			{@const display_name = app.display_name}
			<AppIcon {display_name} />
		{/each}

		<!-- Icon from: https://en.m.wikipedia.org/wiki/File:LinkedIn_icon.svg -->
		<LinkAppIcon display_name="LinkedIn" url="https://www.linkedin.com/in/lorenzo-adam-piazza" icon_url="icon_linkedin.svg" />

		<!-- Icon from: https://static-00.iconduck.com/assets.00/bitbucket-icon-1024x921-2jfidpai.png -->
		<LinkAppIcon display_name="BitBucket" url="https://bitbucket.org/lorenzo_adam_piazza" icon_url="icon_bitbucket.png" />

		<!-- Icon from: https://github.com/logos -->
		<LinkAppIcon display_name="GitHub" url="https://github.com/JollyCookie2000" icon_url="icon_github.svg" />
	</div>
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
		background-size: cover;
		height: 100%;
	}
</style>
