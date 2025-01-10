<script lang="ts">
	let {
		display_name,
		icon,
		on_click = () => {}
	}: {
		display_name: string;
		icon: string;
		on_click?: () => void;
	} = $props();
</script>

<div class="app">
	<button class="icon" onclick={on_click}>
		<img src={icon} alt="Application icon" />
	</button>
	<p class="name">{display_name}</p>
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
		width: 8rem;
	}

	.icon {
		background-color: transparent;
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
		text-shadow:
			-1px -1px 0 #000,
			1px -1px 0 #000,
			-1px 1px 0 #000,
			1px 1px 0 #000;
		user-select: none;
	}
</style>
