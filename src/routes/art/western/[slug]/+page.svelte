<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';

	import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
	import ChevronRight from 'svelte-radix/ChevronRight.svelte';

	let count: number = 20; // total number of items
	let perPage: number = 10; // items per page
	let siblingCount: number = 1; // check his behaviour -- The number of page triggers to show on either side of the current page.
</script>

<Pagination.Root {count} {perPage} {siblingCount} let:pages let:currentPage>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton>
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
					<Pagination.Link {page} isActive={currentPage === page.value}>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton>
				<span class="hidden sm:block">Next</span>
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
