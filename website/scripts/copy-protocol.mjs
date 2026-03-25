/**
 * Copies protocol artifacts (schemas, services, examples) into website/static/
 * so they're served as static files at stable URLs after build.
 *
 * Run before `vite build`: node scripts/copy-protocol.mjs
 */

import { cpSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..');
const staticDir = join(__dirname, '..', 'static');

// Ensure static/ exists
mkdirSync(staticDir, { recursive: true });

// Copy protocol/v1/ → static/v1/
cpSync(join(root, 'protocol', 'v1'), join(staticDir, 'v1'), { recursive: true });

console.log('Copied protocol/v1/ → static/v1/');
