<script lang="ts">
	export let data;
	import { Magnifier } from 'svelte-magnifier';

	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import baseImage from '$lib/imgs/sumiepine.jpg';

	import { onMount } from 'svelte';

	/**
		 * Supabase artwork table example
			id bigint,
			category text,
			title text,
			description text,
			available boolean,
			blobUrl text
		*/
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

	const homepageDbLimit: number = 4;

	let asianImages: ArtWork[] = [
		{
			id: 9007199254740991n,
			category: 'asian',
			title: 'Pine with Moon',
			description: 'A painting made in 2023 with the Sumie painting technique (水墨画).',
			available: false,
			imageName: 'sumiepine.jpg',
			blobUrl: baseImage
		}
	];

	let westernImages: ArtWork[] = [
		{
			id: 9007199254740991n,
			category: 'asian',
			title: 'Pine with Moon',
			description: 'A painting made in 2023 with the Sumie painting technique (水墨画).',
			available: false,
			imageName: 'sumiepine.jpg',
			blobUrl: baseImage
		}
	];

	let stampImages: ArtWork[] = [
		{
			id: 9007199254740991n,
			category: 'asian',
			title: 'Pine with Moon',
			description: 'A painting made in 2023 with the Sumie painting technique (水墨画).',
			available: false,
			imageName: 'sumiepine.jpg',
			blobUrl: baseImage
		}
	];

	onMount(async () => {
		asianImages = await getArtworks('asian');
		westernImages = await getArtworks('western');
		//stampImages = await getArtworks('stamp');
	});

	async function getArtworks(category: string): Promise<ArtWork[]> {
		const dbArtworksName: string = 'artworks';
		const dbCategoryName: string = 'category';
		const dbAsianName: string = 'asian';
		const dbWesternName: string = 'western';
		const dbStampName: string = 'stamp';

		const homepageDbLimit: number = 4;

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
		if (category === dbAsianName) {
			const { data: asianArtworksData, error: asianArtworksError } = await supabase
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
				.eq(dbCategoryName, dbAsianName)
				.limit(homepageDbLimit);

			if (asianArtworksData != null && asianArtworksData.length >= 0) {
				return [...asianArtworksData];
			} else {
				console.log(asianArtworksError);
				return [];
			}
		} else if (category === dbWesternName) {
			// Second request is to get western artworks data
			const { data: westernArtworksData, error: westernArtworksError } = await supabase
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
				.eq(dbCategoryName, dbWesternName)
				.limit(homepageDbLimit);

			if (westernArtworksData != null && westernArtworksData.length >= 0) {
				return [...westernArtworksData];
			} else {
				return [];
			}
		} else if (category === dbStampName) {
			// Third request is to get stamp artworks data
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
				.eq(dbCategoryName, dbStampName)
				.limit(homepageDbLimit);

			if (stampArtworksData != null && stampArtworksData.length >= 0) {
				return [...stampArtworksData];
			} else {
				return [];
			}
		}

		console.log('wrong category name!');
		return [];
	}

	// This function does 4 things in order to update the blob url inside the artwork table:
	// 		1) it takes all the rows of the artwork's table with a null url
	//		2) it takes the title of each one of these rows elem
	//	 	3) get the corresponding url from the storage
	//		4) update each url inside the artwork table
	async function updateBlobUrl(): Promise<void> {
		const dbArtworksName: string = 'artworks';
		const artworksbucket: string = 'artworksbucket';
		const artworkFolder = 'artwork';
		const blobUrlDbName = 'blobUrl';

		// take all the rows without a url and get their id, imagename
		const { data: artworkData, error: artworksError } = await supabase
			.from(dbArtworksName)
			.select(
				`
				id,
				imageName,
				blobUrl
				`
			)
			.eq(blobUrlDbName, '');

		if (artworksError == null && artworkData != null) {
			// for each row inside the artwork table with the empty url
			artworkData.forEach(async (element) => {
				//get the corresponding url
				const publicUrl: string = await getPublicBlobUrl(
					artworksbucket,
					artworkFolder,
					element.imageName
				);

				if (publicUrl != null || publicUrl != '') {
					// update it inside the table
					const { error: updatingError } = await supabase
						.from(dbArtworksName)
						.update({ blobUrl: publicUrl })
						.eq('id', element.id);

					if (updatingError != null) {
						console.log(updatingError);
					}
				}
			});
		}
	}

	// It takes in input a bucket, a folder and a filename; it returns a public url to fetch
	async function getPublicBlobUrl(
		bucket: string,
		folder: string,
		filename: string
	): Promise<string> {
		try {
			const { data } = supabase.storage.from(bucket).getPublicUrl(folder + '/' + filename);
			return data.publicUrl;
		} catch (error) {
			console.log(error);
			return '';
		}
	}
</script>

<div class="p-20">
	<!-- Asian art carousel -->
	<div>
		<div class="space-y-1">
			<h4 class="text-sm font-medium leading-none">
				<a
					href="/art/asian/1"
					class="dark:text-orange-100 dark:hover:text-orange-200 hover:text-emerald-700"
					>Asian Art</a
				>
			</h4>
		</div>
		<Separator class="my-4 bg-cyan-900 border-cyan-950 -ml-4 md:-ml-4" />
		<!-- <div class="flex h-5 items-center space-x-4 text-sm">
			<div></div>
			<Separator orientation="vertical" />
			<div></div>
			<Separator orientation="vertical" />
			<div>Source</div>
		</div> -->

		<Carousel.Root class="w-full -ml-4 md:-ml-4">
			<Carousel.Content class="-ml-4">
				{#each asianImages as image}
					<Carousel.Item class="md:basis-1/2 lg:basis-1/3 max-w-[650px]">
						<div class="p-2">
							<Card.Root class=" dark:bg-teal-950 dark:border-teal-900 bg-cyan-950 border-cyan-950">
								<Card.Header>
									<Card.Title>{image.title}</Card.Title>
								</Card.Header>
								<Card.Content class="grid gap-4">
									<Magnifier
										src={image.blobUrl}
										alt={image.category}
										class="rounded flex items-center"
									/>
								</Card.Content>
								<Card.Footer>
									<Card.Description class="italic">{image.description}</Card.Description>
								</Card.Footer>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous class="bg-black" />
			<Carousel.Next class="bg-black" />
		</Carousel.Root>
	</div>

	<!-- Western Painting carousel -->
	<div class="py-10">
		<div class="space-y-1">
			<h4 class="text-sm font-medium leading-none">
				<a
					class="dark:text-orange-100 dark:hover:text-orange-200 hover:text-emerald-700"
					href="/art/western/1">Western Art</a
				>
			</h4>
		</div>
		<Separator class="my-4 bg-cyan-900 border-cyan-950 -ml-4 md:-ml-4" />

		<Carousel.Root class="w-full -ml-4 md:-ml-4">
			<Carousel.Content class="-ml-4">
				{#each westernImages as image}
					<Carousel.Item class="md:basis-1/2 lg:basis-1/3 max-w-[650px]">
						<div class="p-2">
							<Card.Root class=" dark:bg-teal-950 dark:border-teal-900 bg-cyan-950 border-cyan-950">
								<Card.Header>
									<Card.Title>{image.title}</Card.Title>
								</Card.Header>
								<Card.Content class="grid gap-4">
									<Magnifier
										src={image.blobUrl}
										alt={image.category}
										class="rounded flex items-center"
									/>
								</Card.Content>
								<Card.Footer>
									<Card.Description class="italic">{image.description}</Card.Description>
								</Card.Footer>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous class="bg-black" />
			<Carousel.Next class="bg-black" />
		</Carousel.Root>
	</div>

	<!-- Stamp carousel -->
	<div class="py-10">
		<div class="space-y-1">
			<h4 class="text-sm font-medium leading-none">
				<a
					class="dark:text-orange-100 dark:hover:text-orange-200 hover:text-emerald-700"
					href="/art/stamp/1">Chinese-Japanese Stamps</a
				>
			</h4>
		</div>
		<Separator class="my-4 bg-cyan-900 border-cyan-950 -ml-4 md:-ml-4" />

		<Carousel.Root class="w-full -ml-4 md:-ml-4">
			<Carousel.Content class="-ml-4">
				{#each stampImages as image}
					<Carousel.Item class="md:basis-1/2 lg:basis-1/3 max-w-[650px]">
						<div class="p-2">
							<Card.Root class=" dark:bg-teal-950 dark:border-teal-900 bg-cyan-950 border-cyan-950">
								<Card.Header>
									<Card.Title>{image.title}</Card.Title>
								</Card.Header>
								<Card.Content class="grid gap-4">
									<Magnifier
										src={image.blobUrl}
										alt={image.category}
										class="rounded flex items-center"
									/>
								</Card.Content>
								<Card.Footer>
									<Card.Description class="italic">{image.description}</Card.Description>
								</Card.Footer>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous class="bg-black" />
			<Carousel.Next class="bg-black" />
		</Carousel.Root>
	</div>
</div>
