import { error } from '@sveltejs/kit';
import { readFile, readdir, stat } from 'fs/promises';
import { join, relative, dirname } from 'path';

const SPECS_DIR = join(process.cwd(), '..', 'specs');

/** Recursively collect all .md files under a directory. */
async function collectMdFiles(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const files: string[] = [];
	for (const entry of entries) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await collectMdFiles(full)));
		} else if (entry.name.endsWith('.md')) {
			files.push(full);
		}
	}
	return files;
}

export async function entries() {
	const files = await collectMdFiles(SPECS_DIR);
	return files.map((f) => {
		const rel = relative(SPECS_DIR, f).replace(/\.md$/, '').replace(/\\/g, '/');
		return { slug: rel };
	});
}

/**
 * Rewrite relative links in rendered HTML:
 * - Links to other .md spec files → /docs/... routes
 * - Links to protocol artifacts → /v1/... static files
 */
function rewriteLinks(html: string, slug: string): string {
	const currentDir = dirname(slug);

	return html.replace(/href="([^"]+)"/g, (_match, href: string) => {
		// Skip absolute URLs and anchors
		if (href.startsWith('http') || href.startsWith('#') || href.startsWith('/')) {
			return `href="${href}"`;
		}

		// Resolve relative path from the current spec file's perspective
		const parts = [...currentDir.split('/').filter(Boolean)];
		for (const segment of href.split('/')) {
			if (segment === '..') parts.pop();
			else if (segment !== '.') parts.push(segment);
		}
		const resolved = parts.join('/');

		// Protocol artifacts (protocol/v1/...) → /v1/...
		if (resolved.startsWith('protocol/v1/')) {
			return `href="/${resolved.replace('protocol/', '')}"`;
		}

		// Other spec .md files → /docs/... routes
		if (resolved.endsWith('.md')) {
			const route = resolved.replace(/\.md$/, '');
			return `href="/docs/${route}"`;
		}

		return `href="${href}"`;
	});
}

export async function load({ params }) {
	const slug = params.slug;
	const filePath = join(SPECS_DIR, `${slug}.md`);

	try {
		const fileStat = await stat(filePath);
		if (!fileStat.isFile()) throw new Error('Not a file');
	} catch {
		error(404, `Spec page not found: ${slug}`);
	}

	const markdown = await readFile(filePath, 'utf-8');
	const { marked } = await import('marked');
	let html = await marked(markdown);
	html = rewriteLinks(html, slug);

	// Extract title from first # heading
	const titleMatch = markdown.match(/^#\s+(.+)$/m);
	const title = titleMatch ? titleMatch[1] : slug;

	return { html, title, slug };
}
