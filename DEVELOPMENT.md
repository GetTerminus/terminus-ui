<h1>Developing the Terminus UI</h1>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Developing](#developing)
  - [Demos](#demos)
- [Adding a Component](#adding-a-component)
  - [Branching](#branching)
    - [Naming](#naming)
    - [Workflow](#workflow)
    - [Hotfixes](#hotfixes)
  - [Committing](#committing)
    - [Breaking Changes](#breaking-changes)
  - [Linting](#linting)
  - [Testing](#testing)
  - [Pull Requests](#pull-requests)
  - [Releasing](#releasing)
  - [Code Comments](#code-comments)
  - [Usage Docs](#usage-docs)
- [Issues](#issues)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Developing

```bash
# Build the library
$ yarn run build

# Build and watch library files for changes
$ yarn run build:ts:watch

# Run TypeScript and SCSS linters
$ yarn run lint

# Run all TypeScript tests
$ yarn run test

# Run all TypeScript tests and output coverage
$ yarn run test:ci:local

# Start the demo project and watch demo and lib files for changes
# (don't forget to build the library first!)
$ yarn run start:app

# Test the demo app
$ yarn run test:app

# Lint the demo app
$ yarn run lint:app

# Create a commit with a helpful CLI tool
$ yarn run cm

# Add yourself as a contributor
# See contribution types here: http://bnj.bz/3C1S0A0d1c3U
$ yarn run contributors:add [your-github-handle] [contribution-type]
$ yarn run contributors:generate
```

> Check [package.json][pkg-json] for all available commands


### Demos

1. `yarn install && yarn run build && yarn run start:app`
2. Navigate to `http://localhost:4300/components/`
3. Select a component from the menu (top right)

![Demos Screenshot](https://user-images.githubusercontent.com/270193/35576969-67e0eab6-05ae-11e8-9c38-7d44bcf2c848.png)

## Adding a Component

> NOTE: You can also use the [yeoman generator][generator] to quickly scaffold a new component

1. Create a directory using the component name: `terminus-ui/src/button/`
    - Necessary files:
      - `button.module.ts`
          - Class name: `TsButtonModule`
      - `button.component.ts`
          - Class name: `TsButtonComponent`
      - `button.component.scss`
      - `button.component.html`
1. Import **and** export `button.component.ts` inside `button.module.ts`
1. Add `TsButtonComponent` to the exports **and** declarations of `button.module.ts`.
1. Import `TsButtonModule` in `terminus-ui/src/module.ts` and add it to imports **and** exports array.
1. Export `TsButtonModule` from `terminus-ui/index.ts`.
1. Comment all methods, constants & `@Input`s using the supported [JSDoc style][compodoc_comments].
1. Add a usage example in the component documentation with every possible input and output included.
1. Add the new component to available scopes in `tooling/cz-config.js`
1. Update the status for the component in the [components table](#components)


### Branching

Note: `master` is **always deployable**.

#### Naming

1. Branches should have a brief but comprehensive name.
    - The name should clearly encompass the work that the branch will contain. A name like
    `user-view` may make sense now, but some time later it will be difficult to know what work was
    done on the branch. A better name could be `27-create-user-detail-view`. Be as specific as
    possible, while keeping the length as short as possible.
1. Branches should have the associated GitHub issue number in the name.
    - This is a helpful reference to the issue details. More importantly, it forces everyone to
    create the issue _before_ the work begins. If it is worth doing, than it deserves an issue. This
    creates better historical data and more importantly, gives everyone visibility into the work
    being done.
    - The number should be at the beginning of the branch name: `45-update-payment-gateways`. This
    enables quick auto-completion in most terminals.


#### Workflow

##### Beginning a feature

1. Checkout `master`
1. Pull `master`
1. Create a feature branch from `master` (see [branch naming](#naming))

##### Working on a feature

1. Commit all work on the feature branch
1. Create a [pull request](#pull-requests) at any time (just don't request a review until you are
   finished)
1. Keep the remote up to date with your latest changes. Committing often locally is good, but those
   commits should be pushed to the remote (i.e. GitHub) at _least_ once a day so that the code is
   available to all engineers.

##### Finish a feature

1. If there are conflicts, merge `master` into the feature branch
    - Only do this if there are conflicts
    - See [Pull Requests](#pull-requests) for more information
1. Verify **all** [linters](#linting) run successfully
1. Verify all [tests](#testing) are passing **and** code coverage did not decrease (bonus points if
   it increases)
1. If you haven't yet, create a pull request from the feature branch into `master`
1. Add as much [information into the pull request body](#pull-requests) as possible
1. Request a review


#### Hotfixes

Hotfixes follow the same strategy as features.


### Committing

When code gets merged to master, many of our projects are automatically versioned and released. In
order to give our tooling the information it needs, we write our commit messages in a specific
format. This has the added benefit of improving the readability of our commit history.

```
# The format:
type(scope): message

# Examples:
fix(Button): Aria label is now correctly read by JAWS
feat(Tooltip): Add a tooltip component
chore(): Bump lodash version
```

For a friendlier prompt, you can run `yarn run cm` in the repo. This will ask several questions
and then construct the commit in the proper format for you. The prompt will allow you to choose
from a list of types and then a list of scopes. This is much easier than trying to remember all
possible scopes.

> Optional: Installing [committizen][commitizen-cli] (`yarn add -g committizen`) will allow you
> to run `git cz` or even alias to your preferred git command.

You **must** use one of the defined types since the types have specific meaning to the automatic
versioning tool.

- A type `fix` will increase the patch version (`x.x.1`)
- A type `feat` will increase the minor version (`x.1.x`)

To see all valid types for a project, look for the file `cz-config.js`.


#### Breaking Changes

When a commit contains a breaking change, it _must_ be included in the commit message body (not the
title). Both words should be uppercase and the comment body should include everything that other
engineers may need to know: `BREAKING CHANGE: A description of the breaking change`. This could
include comments, images, code examples, and more. Generally speaking, **more information is
better**.  (Note: when using the cli prompt, it will ask you about any breaking changes and add the
prefix `BREAKING CHANGES: ` automatically)

Learn more about the automatic versioning tools we use:

- [semantic-release][semantic-release]
- [Conference talk on semantic-release][semantic-release-video]
- [validate-commit-msg][validate-commit-msg]


### Linting

All projects should pass all available linters _before_ committing.

TypeScript projects use TSLint, JavaScript projects use ESLint, and SASS/SCSS projects use Stylelint.

To edit configuration, look for the files `tslint.json`, `.eslintrc`, or `.sass-lint.yml`. **These
files should not be edited without a discussion with the team.**

Look at the scripts section in the project's `package.json` for the command to run tests.


### Testing

All projects should work towards full test coverage. This is often not practical in a quickly
changing software startup, but a project should never dip below 80% coverage.

We use [Jest][jest] for unit tests.

Look at the scripts section in the project's `package.json` for the command to run tests.


### Pull Requests

When it is time merge a branch into `master`, create a pull request from the feature into `master`.

1. At the top of the pull request, link to the original issue.
    - If the [ZenHub][zenhub] extension is installed in your browser, you can attach an issue to the
      PR via the built in controls
1. If the pull request includes more than one item, include a high level list of what was done.
1. If the pull request covers UI changes, include a GIF or image to clearly show the change (bonus
   points for before and after images).
1. Request a review from someone on the UI team (any code owners will be notified by default).
1. A pull request may be opened before the work is complete. This makes it easier to get feedback
   while the work is in progress. Include `WIP: ` at the beginning of the pull request title, add
   the `DO NOT MERGE` label so that it is not accidentally merged and `cc/ @mention` anyone that
   should take a look.
1. There are two options to check for merge conflicts between your branch and master:
    - Create a pull request against master. (Note: This will cause any associated CI service to
      begin building the feature branch on every push)
    - Use GitHub's compare view:
    `https://github.com/GetTerminus/terminus-ui/compare/your-branch-name...master`
1. The pull request body, just like the issue body, is the **single source of truth**. Any
   discussions, decisions or relevant information should be added to the pull request body
   immediately.


### Releasing

Releases are handled automatically when code is merged to master. Never merge code to master that is
not production ready!

1. [Semantic Release][semantic-release] looks at all commits since the last tag on master.
1. Based on those commits it will [bump the version number appropriately][semver].
1. A changelog is generated in the release notes on [Github][ui-github].
1. The new version is published to [NPM][ui-npm] under the `next` tag.
1. When the new functionality is verified, it is tagged as `latest`:
    - `npm dist-tag add @terminus/ui@<version to promote> latest`

> NOTE: currently `yarn tag` outputs an error even though the tagging seems to work. Because of
> this, we will continue using NPM for tagging.

You can view the currently published files using the [unpkg CDN][unpkg-terminus].


### Code Comments

When writing code, an engineer should be mindful that others will need to understand and edit this
code in the future. For this reason we don't assume that the future editor has the context.

Modern tooling will handle cleaning up comments and white space so we write for humans - not
machines.

1. Always include a JSDoc-style comment above all methods/functions:

    ```
    /**
     * Get a customer by ID
     *
     * @param customerId - The customer's ID
     * @return The customer object
     */
    ```

1. For general notes, always include the prefix if one applies:

    ```
    // NOTE: A general informational note. Not for every comment; just when there is an important
             piece of unusual information.
    // OPTIMIZE: A note about code that is sub-optimal
    // TODO: A note about missing logic.
    // HACK: A note about a 'hacky' solution.
    // FIXME: A note about something that needs refactoring.
    // BUG: A note about a bug. Include the associated issue number in the note.
    ```

1. All engineers should do their best to never need most of these note types. However, if needed,
  _always_ include the reason the note is needed. Remember, more information is better!


### Usage Docs

Usage docs should be added to all components and directives. These docs are created by adding a markdown file named to match the component
or directive:

```
// component:
foo.component.ts
// usage docs:
foo.component.md
```

When the documentation published, this usage doc will be automatically consumed by the API docs generation.

When editing or creating usage documentation, add headlines and appropriate content, then run `yarn run docs:toc` to update (or generate)
the table of contents.



## Issues

1. Always create an issue for things you work on. If it is worth spending time on, it is worth
   creating an issue for it since that enables other people to learn and help. You can always edit
   the description or close it when the problem is something different or disappears.
1. Always include a link to the original issue when submitting a pull request.
1. If two issues are related, cross link them (a link from each issue to the other one). Put the
   link at the top of each issue's description with a short mention of the relationship (Report,
   etc.). If there are more than 2 issues, use one issue as the central one and cross link all
   issues to this one.
1. After a discussion about a feature update the issue body with the consensus or final conclusions.
   This makes it much easier to see the state of an issue for everyone involved in the
   implementation and prevents confusion and discussion later on.
1. Submit the smallest item of work that makes sense. When creating an issue describe the smallest
   fix possible, put suggestions for enhancements in separate issues and link them.
1. Do not leave issues open for a long time, issues should be actionable and realistic. If you are
   assigned to an issue but don't have time to work on it, remove your assignment so that the next
   available engineer can pick it up.
1. Make a conscious effort to prioritize your work. The priority of items depends on multiple
   factors: Is there a team member waiting for the answer? What is the impact if you delay it? How
   many people does it affect, etc.?
1. If the project is using milestones, pick issues from the current milestone.
1. Assign an issue to yourself as soon as you start to work on it, but not before that time. If you
   complete part of an issue and need someone else to take the next step, re-assign the issue to
   that person.
1. When re-assigning an issue, make sure that the issue body contains the latest information. The
   issue body should be the single source of truth.
1. When working on an issue, ask for feedback from your peers. For example, if you're a designer and
   you propose a design, ping a fellow designer to review your work. If they approve, you can move
   it to the next step. If they suggest changes, you get the opportunity to improve your design.
   This promotes collaboration and advances everyone's skills.
1. Even when something is not done, share it internally so people can comment early and prevent
   rework. Mark the pull request `Work In Progress` or `WIP` so it is not merged by accident.
1. When you create a pull request, mention the issue(s) that it solves in the description. After the
   merge, if any followup actions are required on the issue like reporting back to any customers or
   writing documentation, avoid auto closing it by including text such as 'Fixes #1' or 'Closes #1'.
1. When the pull request is complete, remove the `WIP` prefix and assign the pull request to someone
   to review and merge it. You can still make changes based on feedback, but by removing the WIP
   prefix it clarifies that the main body of work has been completed.
1. If a pull request is assigned to you and there is a merge conflict, consider trying to resolve it
   yourself instead of asking the pull request creator to resolve the conflict. If it is easy to
   resolve, you avoid a round trip between you and the creator, and the pull request gets merged
   sooner. This is a suggestion, not an obligation.
1. If you ask a question to a specific person, always start the comment by mentioning them; this
   will ensure they see it and other people will understand they don't have to respond.
1. Do not close an issue until it is fully complete, which means code has been merged, tested, all
   issue trackers are updated, and any documentation is written and merged.
1. When closing an issue, leave a comment explaining why you are closing the issue.
1. If you notice that the tests for the master branch of any project are failing (red) or broken
   (green as a false positive), fixing this takes priority over everything else development related,
   since everything we do while test are broken may break functionality, or introduce new bugs and
   security issues. If the problem cannot be fixed by you within a few hours, because if it is too
   much work for one person and/or you have other priorities, create an issue, post about it in
   development Slack channel.


🎉 Happy Coding! 🎉


<!-- LINKS -->

[compodoc-badge]: https://rawgit.com/GetTerminus/terminus-ui/master/docs/typescript/images/coverage-badge.svg
[docs-url]: http://uilibrary-docs.terminus.ninja/master/
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
[npm-url]: https://npmjs.org/package/@terminus/ui
[npm-version-image]: http://img.shields.io/npm/v/@terminus/ui.svg
[circle-badge]: https://circleci.com/gh/GetTerminus/terminus-ui/tree/master.svg?style=shield
[circle-link]: https://circleci.com/gh/GetTerminus/terminus-ui/tree/master
[greenkeeper-badge]: https://badges.greenkeeper.io/GetTerminus/terminus-ui.svg
[greenkeeper]: https://greenkeeper.io/
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release]: https://github.com/semantic-release/semantic-release
[codecov-badge]: https://codecov.io/gh/GetTerminus/terminus-ui/branch/master/graph/badge.svg
[codecov-project]: https://codecov.io/gh/GetTerminus/terminus-ui
[file-size-badge]: http://img.badgesize.io/https://unpkg.com/@terminus/ui/bundles/ui.umd.min.js?compression=gzip
[raw-distribution-js]: https://unpkg.com/@terminus/ui/bundles/ui.umd.min.js
[commitizen]: https://github.com/commitizen
[commitizen_vsc]: https://github.com/commitizen
[saucelab_platforms]: https://saucelabs.com/platforms
[compodoc]: https://compodoc.github.io/website/
[compodoc_comments]: https://compodoc.github.io/website/guides/comments.html
[doctoc]: https://github.com/thlorenz/doctoc
[codecov]: https://codecov.io
[codecov_browser]: https://docs.codecov.io/docs/browser-extension
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-video]: https://youtu.be/tc2UgG5L7WM
[markdown]: https://daringfireball.net/projects/markdown/syntax
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog/blob/v0.5.3/conventions/angular.md
[commitizen-cli]: https://github.com/commitizen/cz-cli
[validate-commit-msg]: https://github.com/kentcdodds/validate-commit-msg
[ui-npm]: https://www.npmjs.com/package/@terminus/ui
[ui-github]: https://github.com/GetTerminus/terminus-ui
[semver]: http://semver.org/
[generator]: https://github.com/GetTerminus/generator-terminus-ui
[component-demo-screenshot]: https://user-images.githubusercontent.com/270193/28672864-f05b73cc-72ae-11e7-8ead-efd1ee008f43.png
[unpkg-terminus]: https://unpkg.com/@terminus/ui/
[pkg-json]: https://github.com/GetTerminus/terminus-ui/blob/master/package.json
[jest]: https://facebook.github.io/jest/
[zenhub]: https://www.zenhub.com/
