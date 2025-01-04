<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let {
		display_name,
		url,
		icon_url,
	} : {
		display_name: string;
		url: string;
		icon_url: string,
	} = $props();

	let show_prompt: boolean = $state(false);
</script>

<div class="app">
	<div class="icon" onclick={() => { show_prompt = true; } }>
		<img src={icon_url} alt="Website icon" />
	</div>
	<p class="name">{display_name}</p>

	{#if show_prompt}
		<div class="prompt" transition:scale={{ duration: 250 }}>
			<p>You are trying to open the following external link:</p>
			<p class="bold">{url}</p>
			<p>How do you wish to open it?</p>
			<button onclick={() => show_prompt = false}>Close</button>
			<a href={url} target="_self">Current tab</a>
			<a href={url} target="_blank">New tab</a>
		</div>

		<div class="dark-background" onclick={() => { show_prompt = false; } } transition:fade={{ duration: 250 }}></div>
	{/if}
</div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	.app {
		height: 8rem;
		user-select: none;
		width: 8rem;
	}

	.bold {
		font-weight: bold;
	}

	.dark-background {
		background-color: rgba(0, 0, 0, 0.9);
		height: 100%;
		left: 0px;
		position: fixed;
		top: 0px;
		width: 100%;
		z-index: 20;
	}

	.icon {
		height: 80%;
		padding: 4px;
		text-align: center;
		width: 100%;
	}

	.icon img {
		height: 100%;
	}

	.name {
		color: white;
		font-family: Arial;
		font-weight: bold;
		height: 20%;
		padding: 4px;
		text-align: center;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
		user-select: none;
	}

	.prompt {
		background-color: #1e272e;
		border-radius: 16px;
		color: #d2dae2;
		font-family: Arial;
		padding: 32px;

		left: 50%;
		position: fixed;
		top: 50%;
		transform: translate(-50%, -50%);
		max-width: 512px;
		width: 90%;
		z-index: 30;
	}

	.prompt a, .prompt button {
		background-color: transparent;
		color: #0fbcf9;
		font-family: inherit;
		font-size: inherit;
		text-decoration: none;
	}

	.prompt a:active, .prompt button:active {
		color: #3c40c6;
	}

	.prompt a, .prompt button, .prompt p {
		margin: 8px;
	}
</style>
