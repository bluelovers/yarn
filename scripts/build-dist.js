const { copySync, ensureDir, ensureDirSync } = require('fs-extra');
const { join, basename } = require('path');

const version = require('../package.json').version;
const node_version = process.versions.node.split('.')[0];

const __ROOT = join(__dirname, '..');

[
	'dist/lib',
	'dist/bin',
].forEach(dir => {
	ensureDirSync(join(__ROOT, dir))
});

[
	['package.json'],
	['README.md'],
	['LICENSE'],
	[`artifacts/yarn-legacy-${version}.js`, `lib/cli.js`],
	['bin/', 'bin/'],
	['node_modules/v8-compile-cache/v8-compile-cache.js', 'lib/v8-compile-cache.js'],
].forEach(([file, new_target]) => {
	copySync(join(__ROOT, file), join(__ROOT, `dist/${new_target || basename(file)}`), {
		preserveTimestamps: true,
		overwrite: true,
	});
});
