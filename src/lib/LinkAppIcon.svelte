<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let {
		display_name,
		url,
	} : {
		display_name: string;
		url: string;
	} = $props();

	let show_prompt: boolean = $state(false);
</script>

<div class="app">
	<div class="icon" onclick={() => { show_prompt = true; } }>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
			<path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
			<path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
		</svg>
	</div>
	<p class="name">{display_name}</p>

	{#if show_prompt}
		<div class="prompt" transition:scale>
			<p>You are trying to open an external link.</p>
			<p>How do you wish to open it?</p>
			<a href={url} target="_self">Current tab</a>
			<a href={url} target="_blank">New tab</a>
		</div>

		<div class="open-app" onclick={() => { show_prompt = false; } } transition:fade></div>
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
		/* background-color: red; */
		height: 8rem;
		user-select: none;
		width: 8rem;
	}

	.icon {
		/* background-color: green; */
		height: 80%;
		padding: 4px;
		width: 100%;
	}

	.icon svg {
		height: 100%;
		width: 100%;
	}

	.name {
		/* background-color: blue; */
		color: white;
		font-family: Arial;
		font-weight: bold;
		height: 20%;
		padding: 4px;
		text-align: center;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
		user-select: none;
	}

	.open-app {
		background-color: rgba(0, 0, 0, 0.9);
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

	.prompt a {
		color: #0fbcf9;
		text-decoration: none;
	}

	.prompt a:active {
		color: #3c40c6;
	}

	.prompt a, .prompt p {
		margin: 8px;
	}
</style>
