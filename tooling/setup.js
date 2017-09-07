var fs = require('fs'),
	resolve = require('path').resolve,
	join = require('path').join,
	cp = require('child_process');

let startingDirectory = process.cwd(),
	excludedDirectories = ["node_modules", "dist"],
	attempts = [];

	

// Install from the root directory first
tryInstall(startingDirectory);

// We need to run 'yarn run build' so the dist directory is created
runBuild(startingDirectory);

// Recursively crawl subdirectories and install in any which contain
// package.json, breadth first
crawlDir(startingDirectory);

// Output the results to the console
outputResults();

// Aaaand we're done!
process.exit(0);



function crawlDir(dir) {
	let subdirs = [];

	fs.readdirSync(dir)
		.forEach(function (mod) {
			let modPath = join(dir, mod),
				stat = fs.statSync(modPath);

			if (stat.isDirectory() && excludedDirectories.indexOf(mod) === -1) {
				subdirs.push(modPath);
			}
		});

	for (let i = 0, len = subdirs.length; i < len; i++) {
		tryInstall(subdirs[i]);
	}

	for (let i = 0, len = subdirs.length; i < len; i++) {
		crawlDir(subdirs[i]);
	}
}

function tryInstall(path) {
	if (!fs.existsSync(join(path, 'package.json'))) return;

	console.log('\n-------------- installing in: %s\n', path);

	let result = cp.spawnSync('yarn', ['install'], { env: process.env, cwd: path, stdio: 'inherit' });

	if (result.status === 0) {
		attempts.push({
			path: path,
			result: 1
		});
	} else {
		attempts.push({
			path: path,
			result: 0
		});
	}
}

function runBuild(path) {
	let result = cp.spawnSync('yarn', ['run', 'build'], { env: process.env, cwd: path, stdio: 'inherit' });
	if (result.status !== 0) {
		console.log('\n\x1b[0;31mAborting, build failed!\x1b[m\n');
		process.exit(1);
	}
}

function outputResults() {
	let successes = attempts.filter((attempt) => (attempt.result)),
		failures = attempts.filter((attempt) => (!attempt.result));

	console.log('\n');
	for (let i = 0, len = attempts.length; i < len; i++) {
		let attempt = attempts[i],
			resultText = (attempt.result) ? 'Success' : 'Failed!',
			resultColor = (attempt.result) ? '\x1b[0;32m' : '\x1b[0;31m';
	
		console.log('[%s%s\x1b[m] %s', resultColor, resultText, attempt.path);
		
	}
	console.log('\nInstalls attempted: (%d), succeeded: (%d), failed: (%d)\n', attempts.length, successes.length, failures.length);
}
