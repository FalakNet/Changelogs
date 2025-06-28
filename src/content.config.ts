import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import fs from 'fs';
import path from 'path';

// Define the schema for all collections
const releaseSchema = () =>
	z.object({
		title: z.string(),
		description: z.string(),
		versionNumber: z.string(),
		date: z.date({ coerce: true }),
	});

// Dynamically find all content folders in src/content (including 'releases')
const contentDir = path.resolve('./src/content');
const collectionFolders = fs
	.readdirSync(contentDir, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('_'))
	.map((dirent) => dirent.name);

// Build collections object dynamically
const collections = Object.fromEntries(
	collectionFolders.map((folder) => [
		folder,
		defineCollection({
			loader: glob({ base: `./src/content/${folder}`, pattern: ['*.md', '!info.md'] }),
			schema: releaseSchema,
		}),
	])
);

export { collections };
