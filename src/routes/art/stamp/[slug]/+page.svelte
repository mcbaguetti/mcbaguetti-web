<script lang="ts">
	export let data;

	import * as Pagination from '$lib/components/ui/pagination';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';

	import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
	import ChevronRight from 'svelte-radix/ChevronRight.svelte';

	import { onMount } from 'svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	let numberOfPage: number = parseInt($page.params.slug);
	let nextPage: number = numberOfPage + 1;
	let previousPage: number = numberOfPage - 1;

	const dbArtworksName: string = 'artworks';
	const dbCategoryName: string = 'category';
	const dbstampName: string = 'stamp';

	type ArtWork = {
		id: bigint;
		category: string;
		title: string;
		description: string;
		available: boolean;
		imageName: string;
		blobUrl: string; //| Uint8Array; //tocheck again
	};

	let { supabase } = data;
	$: ({ supabase } = data);

	let stampImages: ArtWork[] = [
		{
			id: 9007199254740991n,
			category: 'stamp',
			title: 'Pine with Moon',
			description: 'A painting made in 2023 with the Sumie painting technique (水墨画).',
			available: false,
			imageName: 'sumiepine.jpg',
			blobUrl: 'url'
		}
	];

	let count: number = 1; // total number of items
	let perPage: number = 8; // items per page
	let siblingCount: number = 1; // check his behaviour -- The number of page triggers to show on either side of the current page.
	let rowsOfDb: number | undefined;

	onMount(async () => {
		try {
			numberOfPage = parseInt($page.params.slug);
			nextPage = numberOfPage + 1;
			previousPage = numberOfPage - 1;

			stampImages = await getArtworks();

			rowsOfDb = await getNumOfDbRows();
			if (rowsOfDb === undefined) {
				rowsOfDb = 1;
			}
			count = rowsOfDb;
		} catch (error) {
			console.log('onMountError' + error);
		}
	});

	async function getNumOfDbRows(): Promise<number | undefined> {
		// const { data: rowsData, count: rowsCount } = supabase
		// 	.from(dbArtworksName)
		// 	.select('*', { count: 'exact' })
		// 	.eq(dbCategoryName, dbstampName);
		// return rowsCount;

		const { data: stampData, error: stampDataError } = await supabase
			.from(dbArtworksName)
			.select(
				`
			id
			`
			)
			.eq(dbCategoryName, dbstampName);

		return stampData?.length;
	}

	async function getArtworks(): Promise<ArtWork[]> {
		/**
		 * Supabase artwork table example
			id bigint,
			category text,
			title text,
			description text,
			available boolean,
			imageName text,
			blobUrl text
		*/
		// console.log(numberOfPage);
		// console.log((numberOfPage - 1) * perPage + '     ' + numberOfPage * perPage);
		const { data: stampArtworksData, error: stampArtworksError } = await supabase
			.from(dbArtworksName)
			.select(
				`
			id,
			category,
			title,
			description,
			available,
			imageName,
			blobUrl
			`
			)
			.eq(dbCategoryName, dbstampName)
			.order('id', { ascending: false }) // check if this could be del
			.range((numberOfPage - 1) * perPage, numberOfPage * perPage);

		if (stampArtworksData != null && stampArtworksData.length >= 0) {
			return [...stampArtworksData];
		} else {
			console.log('getartworks error' + stampArtworksError);
			return [];
		}
	}

	afterNavigate(async () => {
		try {
			numberOfPage = parseInt($page.params.slug);
			nextPage = numberOfPage + 1;
			previousPage = numberOfPage - 1;

			stampImages = await getArtworks();

			rowsOfDb = await getNumOfDbRows();
			if (rowsOfDb === undefined) {
				rowsOfDb = 1;
			}
			count = rowsOfDb;
		} catch (error) {
			console.log('onMountError' + error);
		}
	});
</script>

<div class="p-20">
	<!-- stamp art carousel -->
	<div>
		<div class="space-y-1">
			<h4 class="text-sm font-medium leading-none">
				<a
					href="/art/stamp"
					class="dark:text-orange-100 dark:hover:text-orange-200 hover:text-emerald-700"
					>stamp Art</a
				>
			</h4>
		</div>
		<Separator class="my-4 bg-cyan-900 border-cyan-950 -ml-4 md:-ml-4" />
		<!-- md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl -->
		<div
			class="2xl:grid 2xl:grid-rows-3 2xl:grid-col-3 2xl:grid-flow-col 2xl:gap-4 xl:grid xl:grid-rows-3 xl:grid-col-3 xl:grid-flow-col xl:gap-4 lg:grid lg:grid-rows-3 lg:grid-col-3 lg:grid-flow-col lg:gap-4"
		>
			{#each stampImages as image}
				<div class="p-2 space-y-1.5">
					<Card.Root class=" dark:bg-teal-950 dark:border-teal-900 bg-cyan-950 border-cyan-950">
						<Card.Header>
							<Card.Title>{image.title}</Card.Title>
						</Card.Header>
						<Card.Content>
							<img
								src={image.blobUrl}
								alt={image.category}
								class="rounded flex items-center 2xl:h-72"
							/>
						</Card.Content>
						<Card.Footer>
							<Card.Description class="italic">{image.description}</Card.Description>
						</Card.Footer>
					</Card.Root>
				</div>
			{/each}
		</div>
	</div>
</div>

<Pagination.Root {count} {perPage} let:pages let:currentPage>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton
				on:click={() => {
					goto('/art/stamp/' + previousPage);
				}}
			>
				<span class="hidden sm:block">Previous</span>
				<ChevronLeft class="h-4 w-4" />
			</Pagination.PrevButton>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item>
					<Pagination.Link {page} isActive={numberOfPage === page.value}>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}

		<Pagination.Item>
			<Pagination.NextButton
				on:click={() => {
					goto('/art/stamp/' + nextPage);
				}}
			>
				<span class="hidden sm:block">Next</span>
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
