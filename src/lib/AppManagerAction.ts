import type { Component } from "svelte";

export default class AppManagerAction {
	constructor(
		public readonly app_component: Component,
	) {}
}
