<script lang="ts">
	import StatusBar from "./StatusBar.svelte";
</script>

<div class="screen">
	<StatusBar />
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
