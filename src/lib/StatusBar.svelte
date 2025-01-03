<script lang="ts">
	import { onMount } from "svelte";

	let current_date_time: Date = $state(new Date());

	let current_time_string: string = $derived(
		`${current_date_time.getHours()}:`.padStart(3, '0') +
		`${current_date_time.getMinutes()}:`.padStart(3, '0') +
		`${current_date_time.getSeconds()}`.padStart(2, '0')
	);

	onMount(() => {
		const clock_update_interval = setInterval(() => {
			current_date_time = new Date();
		}, 1000);

		return () => {
			clearInterval(clock_update_interval);
		}
	});
</script>

<div class="status-bar">
	{current_time_string}
</div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	.status-bar {
		backdrop-filter: blur(8px);
		background-color: rgba(50, 50, 50, 0.5);
		box-shadow: 0px 0px 32px rgba(50, 50, 50, 1.0);
		color: white;
		padding: 2px 16px;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
		user-select: none;
	}
</style>
