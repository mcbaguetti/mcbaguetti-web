<script lang="ts">
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';

	import Skull from 'lucide-svelte/icons/skull';

	import EnvelopeClosed from 'svelte-radix/EnvelopeClosed.svelte';
	import InstagramLogo from 'svelte-radix/InstagramLogo.svelte';
	import TwitterLogo from 'svelte-radix/TwitterLogo.svelte';

	import * as Command from '$lib/components/ui/command/index.js';
	import { Separator } from '$lib/components/ui/separator';
</script>

<ModeWatcher defaultMode={'dark'} />

<nav class="bg-rose-950 flex">
	<h1 class="p-1 pt-2 text-5xl">Mc Baguetti</h1>

	<div class="mx-auto max-w-3xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex flex-shrink-0 items-center"></div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-10">
						<button class="flex rounded-md px-3 py-2" on:click={toggleMode}>
							<Skull class="absolute h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100" />
						</button>
						<a
							href="/"
							class="rounded-md bg-gray-900 text-gray-200 hover:bg-teal-950 hover:text-gray-400 px-3 py-2 text-sm font-medium"
							aria-current="page">Homepage</a
						>
						<a
							href="/art/asian/1"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-teal-950 hover:text-white"
							>Asian Art</a
						>
						<a
							href="/art/western/1"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-teal-950 hover:text-white"
							>Western Art</a
						>
						<a
							href="/art/stamp/1"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-teal-950 hover:text-white"
							>Stamps</a
						>
						<a
							href="/about"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-teal-950 hover:text-white"
							>About</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>
<slot />

<footer class="flex justify-center">
	<div class="py-20">
		<h4
			class="text-sm font-medium leading-none dark:text-orange-100 dark:hover:text-orange-200 hover:text-emerald-700"
		>
			<a href="/about">Contact</a>
		</h4>
		<Separator class="w-full my-4 bg-cyan-900 border-cyan-950" />

		<Command.Root class="max-w-[400px] min-w-[400px]  rounded-lg border shadow-md">
			<Command.List>
				<Command.Item></Command.Item>
				<Command.Item>If you want to follow or email me:</Command.Item>

				<Command.Item>
					<InstagramLogo class="mr-2 h-4 w-4" />
					<span class="dark:text-orange-100 dark:hover:text-orange-200 hover:text-emerald-700"
						><a href="https://www.instagram.com/mc_baguette/">Instagram</a></span
					>
				</Command.Item>
				<Command.Item>
					<TwitterLogo class="mr-2 h-4 w-4" />
					<span class="dark:text-orange-100 dark:hover:text-orange-200 hover:text-emerald-700"
						><a href="https://x.com/TommasoComelli?t=hCK7AiQK4nqBl4LTrIBjUQ&s=09"
							>(Former) Twitter</a
						></span
					>
				</Command.Item>
				<Command.Item>
					<EnvelopeClosed class="mr-2 h-4 w-4" />
					<span class="dark:text-orange-100 dark:hover:text-orange-200 hover:text-emerald-700"
						><a href="mailto:comelli.tom@gmail.com">Mail</a></span
					>
				</Command.Item>
			</Command.List>
		</Command.Root>
	</div>
</footer>

<style>
	h1 {
		font-family: 'barcode', monospace, 'Courier New', Courier;
	}
</style>
