<script lang="ts">
	let {
		text = '',
		on_click = () => {}
	}: {
		text?: string;
		on_click?: () => void;
	} = $props();
</script>

<button onclick={on_click}>{text}</button>

<style>
	button {
		background-color: #2f2f2f;
		border-radius: 4px;
		border-style: none;
		box-shadow:
			1px 1px 5px #000000,
			-1px -1px 5px #6f6f6f,
			inset 1px 1px 5px #2b2b2b,
			inset -1px -1px 5px #424242;
		color: #c4c4c4;
		font-size: 14px;
		padding: 10px 20px;
	}

	button:active {
		box-shadow:
			1px 1px 5px #5b5b5b,
			-1px -1px 5px #000000,
			inset 1px 1px 5px #5b5b5b,
			inset -1px -1px 5px #000000;
	}
</style>
