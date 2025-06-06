import type { Component } from 'svelte';

import type { AppOptions } from './apps/AppOptions';

export default class AppManagerAction {
	constructor(
		public readonly app_component: Component,
		public readonly app_options: AppOptions
	) {}
}
