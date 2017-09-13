const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;
const cp = require('child_process');

const colorGreen = '\x1b[0;32m';
const colorRed = '\x1b[0;31m';
const colorReset = '\x1b[m';
const startingDirectory = process.cwd();
const excludedDirectories = ['node_modules', 'dist'];
const attempts = [];


// Install from the root directory first
tryInstall(startingDirectory);

// We need to run 'yarn run build' so the dist directory is created
runBuild(startingDirectory);

// Recursively crawl subdirectories and install in any which contain
// package.json, breadth first
crawlDir(startingDirectory);

// Determine the number of both successful and failed builds
const successes = attempts.filter((attempt) => (attempt.result));
const failures = attempts.filter((attempt) => (!attempt.result));

// Output the results to the console
outputResults(successes, failures);

// If we had no failures, Wire up demo lib dependency with yarn links
if (failures.length === 0) {
  createLinks();
}

// Aaaand we're done!
process.exit(0);


function crawlDir(dir) {
  const subdirs = [];

  // Read each file and directory in the directory specified by dir
  fs.readdirSync(dir)
    .forEach(function(mod) {
      const modPath = join(dir, mod);
      const stat = fs.statSync(modPath);

      // If this is a directory that we aren't excluding, add it to our list
      if (stat.isDirectory() && excludedDirectories.indexOf(mod) === -1) {
        subdirs.push(modPath);
      }
    });

  // Attempt a 'yarn install' in each identified subdirectory
  for (let i = 0, len = subdirs.length; i < len; i++) {
    tryInstall(subdirs[i]);
  }

  // Crawl each identified subdirectory for additional directories to install from
  for (let i = 0, len = subdirs.length; i < len; i++) {
    crawlDir(subdirs[i]);
  }
}

function tryInstall(path) {
  // If there is no package.json file in this directory, skip it (return)
  if (!fs.existsSync(join(path, 'package.json'))) {
    return
  };

  console.log(`\n-------------- installing in: ${path}\n`);

  // Spawn a synchronous process and issue the command 'yarn install'
  const result = cp.spawnSync('yarn', ['install'], {
    env: process.env,
    cwd: path,
    stdio: 'inherit',
  });

  // A result code of 0 indicates success, anything else is an error
  if (result.status === 0) {
    attempts.push({
      path: path,
      result: 1,
    });
  } else {
    attempts.push({
      path: path,
      result: 0,
    });
  }
}

function runBuild(path) {
  // Spawn a synchronous process in the directory specified by path and
  // issue the command 'yarn run build'
  const result = cp.spawnSync('yarn', ['run', 'build'], {
    env: process.env,
    cwd: path,
    stdio: 'inherit',
  });

  // A result code of 0 indicates success, anything else is an error
  if (result.status !== 0) {
    console.log(`\n${colorRed}Aborting, build failed!${colorReset}\n`);
    process.exit(1);
  }
}

function createLinks() {
  // Spawn a synchronous process in the dist directory and issue the 
  // command 'yarn link', so we can point to this local copy to satisfy
  // a package.json dependency
  let result = cp.spawnSync('yarn', ['link'], {
    env: process.env,
    cwd: join(startingDirectory, "dist"),
    stdio: 'inherit',
  });

  // A result code of 0 indicates success, anything else is an error.. if
  // an error occurred here, we don't want to proceed with linking the lib
  // into the demo subdirectory
  if (result.status !== 0) {
    console.log(`\n${colorRed}Aborting, failed to link lib source!${colorReset}\n`);
    return;
  }

  // Spawn a synchronous process in the src/demo directory and issue the
  // command 'yarn link @terminus/ui', which will satisfy the '@angular/ui'
  // dependency by pointing at our local copy instead of the remote one
  result = cp.spawnSync('yarn', ['link', '@terminus/ui'], {
    env: process.env,
    cwd: join(startingDirectory, "src/demo"),
    stdio: 'inherit',
  });

  // A result code of 0 indicates success, anything else is an error..
  if (result.status !== 0) {
    console.log(`\n${colorRed}Aborting, failed to link to lib from demo!${colorReset}\n`);
    return;
  }

  console.log(`${colorGreen}Successfully linked lib dependency to demo project${colorReset}`);
}

function outputResults(successes, failures) {
  console.log('\n');

  for (let i = 0, len = attempts.length; i < len; i++) {
    const attempt = attempts[i];
    const resultText = (attempt.result) ? 'Success' : 'Failed!';
    const resultColor = (attempt.result) ? colorGreen : colorRed;

    console.log(`[${resultColor}${resultText}${colorReset}] ${attempt.path}`);
  }

  let summaryText = `\nInstalls attempted: (${attempts.length})`;

  if (successes.length > 0) {
    summaryText += `, ${colorGreen}succeeded: (${successes.length})`;
  }

  if (failures.length > 0) {
    summaryText += `, ${colorRed}failed: (${failures.length})`;
  }

  summaryText += colorReset;

  console.log(summaryText);
}
