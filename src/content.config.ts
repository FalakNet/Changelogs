import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const releaseSchema = ({ image }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		versionNumber: z.string(),
		image: z.object({
			src: image(),
			alt: z.string(),
		}),
		// Transform string to Date object
		date: z.date({ coerce: true }),
	});

const releases = defineCollection({
	// Load Markdown files in the src/content/releases directory.
	loader: glob({ base: './src/content/releases', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: releaseSchema,
});

const gardenx = defineCollection({
	loader: glob({ base: './src/content/gardenx', pattern: '**/*.md' }),
	schema: releaseSchema,
});

const falakacademy = defineCollection({
	loader: glob({ base: './src/content/falakacademy', pattern: '**/*.md' }),
	schema: releaseSchema,
});

const clarityai = defineCollection({
	loader: glob({ base: './src/content/clarityai', pattern: '**/*.md' }),
	schema: releaseSchema,
});

export const collections = { releases, gardenx, falakacademy, clarityai };
