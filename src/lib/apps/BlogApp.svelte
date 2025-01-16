<script lang="ts">
	import type AppManagerAction from "$lib/AppManagerAction";
	import type { AppOptions } from "./AppOptions";

	let {
			app_manager_exec,
			app_options
		}: {
			app_manager_exec: (action: AppManagerAction) => void;
			app_options?: AppOptions;
		} = $props();
</script>

<div class="app">

</div>

<style>
	* {
		border-width: 0px;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}
</style>
