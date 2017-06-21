# Terminus UI Library

The library of UI components used for Terminus applications.

[![CircleCI][circle_badge]][circle_link] [![NPM version][npm_version_image]][npm_url] [![documentation coverage][compodoc_badge]][docs_index] [![Greenkeeper badge][greenkeeper_badge]][greenkeeper] [![semantic-release][semantic_release_badge]][semantic_release] [![MIT License][license_image]][license_url]


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Adding a Component](#adding-a-component)
- [Developing](#developing)
- [Releasing](#releasing)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Adding a Component

1. Create a directory using the component name: `src/lib/src/button/`
    - Necessary files:
      - `button.module.ts`
          - Class name: `TsButtonModule`
      - `button.component.ts`
          - Class name: `TsButtonComponent`
      - `button.component.scss`
      - `button.component.html`
1. Import **and** export `button.component.ts` inside `button.module.ts`
1. Add `TsButtonComponent` to the exports **and** declarations of `button.module.ts`.
1. Import `TsButtonModule` in `src/lib/src/module.ts` and add it to the `TERMINUS_MODULES` array.
1. Export `TsButtonModule` from `src/lib/index.ts`.
1. Comment all methods, constants & `@Input`s using the supported [JSDoc style][compodoc_comments].
1. Add a usage example in the component documentation with every possible input included.
1. Document styles using [nucleus comments][nucleus_annotation].


## Developing

TODO


## Releasing

TODO


## Resources

- [Semantic Release][semantic_release] - Automatically release versioned release to NPM and generate
    a changelog in the Github tag.
- [Greenkeeper][greenkeeper] - Automatically keep dependencies up to date.
- [Commitizen][commitizen] - Interactive cli for enforcing commit message format.
- [Commitizen VSCode Plugin][commitizen_vsc] - VSCode plugin for commitizen.
- [SauceLabs Platforms][saucelab_platforms] - Cross-browser unit tests.
- [Nucleus][nucleus] - Generates SCSS documentation.
- [Doctoc][doctoc] - Generate documentation table of contents.


[compodoc_badge]: https://rawgit.com/GetTerminus/terminus-ui/master/docs/images/coverage-badge.svg
[docs_index]: docs/coverage.html
[license_image]: http://img.shields.io/badge/license-MIT-blue.svg
[license_url]: LICENSE
[npm_url]: https://npmjs.org/package/@terminus/ui
[npm_version_image]: http://img.shields.io/npm/v/@terminus/ui.svg
[circle_badge]: https://circleci.com/gh/GetTerminus/terminus-ui/tree/master.svg?style=svg
[circle_link]: https://circleci.com/gh/GetTerminus/terminus-ui/tree/master
[greenkeeper_badge]: https://badges.greenkeeper.io/GetTerminus/terminus-ui.svg
[greenkeeper]: https://greenkeeper.io/
[semantic_release_badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic_release]: https://github.com/semantic-release/semantic-release

[semantic_release]: https://github.com/semantic-release/semantic-release
[commitizen]: https://github.com/commitizen
[commitizen_vsc]: https://github.com/commitizen
[saucelab_platforms]: https://saucelabs.com/platforms
[compodoc]: https://compodoc.github.io/website/
[compodoc_comments]: https://compodoc.github.io/website/guides/comments.html
[nucleus]: https://github.com/holidaypirates/nucleus/
[nucleus_annotation]: https://holidaypirates.github.io/nucleus/annotation-reference.html
[doctoc]: https://github.com/thlorenz/doctoc
