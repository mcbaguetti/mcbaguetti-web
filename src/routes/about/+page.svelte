<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="flex justify-center">
	<div class="py-20">
		<h4
			class="text-sm font-medium leading-none dark:text-orange-100 dark:hover:text-orange-200 hover:text-emerald-700"
		>
			About me
		</h4>

		<Separator class="w-full my-4 bg-cyan-900 border-cyan-950" />

		<Command.Root class="max-w-[700px] min-w-[400px]  rounded-lg border shadow-md">
			<Command.List>
				<Command.Item></Command.Item>
				<Command.Item></Command.Item>

				<Command.Item>
					I&#39;m an Italian software engineer with a passion for both Western and Asian art and
					technology. At university, I studied Computer Engineering in Milan and Turin. During that
					time, I also began studying the Chinese language and Japanese art, particularly sumie and
					calligraphy. After graduating, I won a scholarship to study Chinese in Taiwan, where I
					explored various styles of Chinese calligraphy and learned how to carve Chinese and
					Japanese seals. Upon returning from Taiwan, I continued practicing oriental art and
					started an oil painting course in Milan. There, I deepened my knowledge of color theory,
					Western techniques, composition, lighting, and more. This website is a collection of some
					of my works, as well as an opportunity to experiment with web technologies I&#39;ve been
					eager to explore.
				</Command.Item>
			</Command.List>
		</Command.Root>
	</div>
</div>
