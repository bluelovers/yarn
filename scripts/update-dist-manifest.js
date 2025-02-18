#!/usr/bin/env node
/**
 * Generates a `package.json` file for the Yarn distributable. This is based on
 * the root package.json, with the following differences:
 * - It has an `installationMethod` field that's set to the method used to
 *   install Yarn (eg. "tar", "brew", "msi")
 * - It doesn't include any of the dependencies, as they are bundled in the Yarn
 *   JS file itself.
 */

const fs = require('fs');
const path = require('path');
const packageManifestFilename = process.argv[2] || path.join(__dirname, '..', 'dist/package.json');
const packageManifest = require(packageManifestFilename);

packageManifest.installationMethod = process.argv[3] || 'tar';

if (!packageManifest.installationMethod) {
  throw new Error('You need to specify an installation method.');
}

delete packageManifest.dependencies;
delete packageManifest.devDependencies;
delete packageManifest.jest;
delete packageManifest.config;
delete packageManifest.resolutions;

packageManifest.scripts = {
  preinstall: ':; (node ./preinstall.js > /dev/null 2>&1 || true)',
};

fs.writeFileSync(
  packageManifestFilename,
  JSON.stringify(packageManifest, null, 2) + '\n'
);
