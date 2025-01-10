<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let {
		on_close,
		url,
	}: {
		on_close: () => void,
		url: string;
	} = $props();

	function close_prompt() {
		on_close();
	}
</script>

<div class="prompt" transition:scale={{ duration: 250 }}>
	<p>You are trying to open the following external link:</p>
	<p class="bold">{url}</p>
	<p>How do you wish to open it?</p>
	<button onclick={close_prompt}>Close</button>
	<a href={url} target="_self">Current tab</a>
	<a href={url} target="_blank">New tab</a>
</div>

<div
	class="dark-background"
	onclick={close_prompt}
	transition:fade={{ duration: 250 }}
></div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	.bold {
		font-weight: bold;
	}

	.dark-background {
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(4.4px);
		height: 100%;
		left: 0px;
		position: fixed;
		top: 0px;
		width: 100%;
		z-index: 20;
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

	.prompt a,
	.prompt button {
		background-color: transparent;
		color: #0fbcf9;
		font-family: inherit;
		font-size: inherit;
		text-decoration: none;
	}

	.prompt a:active,
	.prompt button:active {
		color: #3c40c6;
	}

	.prompt a,
	.prompt button,
	.prompt p {
		margin: 8px;
	}
</style>
