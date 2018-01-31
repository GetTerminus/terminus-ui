# Terminus UI Library


The library of UI components used for Terminus applications.

[![CircleCI][circle-badge]][circle-link]
[![codecov][codecov-badge]][codecov-project]
[![documentation coverage][compodoc-badge]][docs-url]
[![NPM version][npm-version-image]][npm-url]
[![Library size][file-size-badge]][raw-distribution-js]
[![Greenkeeper badge][greenkeeper-badge]][greenkeeper]
[![semantic-release][semantic-release-badge]][semantic-release]
[![MIT License][license-image]][license-url]
[![All Contributors][contributor-shield]](#contributors)


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Library Component Documentation](#library-component-documentation)
- [Primary Library Features](#primary-library-features)
- [Available Features](#available-features)
  - [Components](#components)
  - [Pipes](#pipes)
  - [Services](#services)
  - [TypeScript Utilities](#typescript-utilities)
  - [Style Helpers](#style-helpers)
- [Installation](#installation)
- [Global Styles](#global-styles)
- [SCSS Helpers](#scss-helpers)
- [Development Workflow](#development-workflow)
- [Project Resources](#project-resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Library Component Documentation

This document covers documentation for building and maintaining the terminus-ui library. For
documentation on all components and styles, visit [GetTerminus.github.io/terminus-ui][docs-url].


## Primary Library Features

1. Demo app for developing within a real application
1. Testing
    - Unit (cross-browser)
    - JiT integration
    - AoT integration
    - ~~Style regression~~ (TODO)
1. Linting
    - TypeScript
    - SCSS
1. Documentation (`docs/`)
    - Manual docs for basic project flow (README)
      - Automated Table of Contents updates
      - Automated markdown link checking
    - Generated docs for TypeScript (`docs/typescript/`)
    - Generated docs for SCSS (`docs/styleguide/`)
1. Automated semantic versioning & publishing to [NPM][npm-url]
1. Enforced commit style
1. Tree-shaking via Rollup.js
1. SCSS variables & functions exposed to the consuming application
1. Code coverage reporting (`coverage/`)
1. Automated dependency updates


## Available Features

> - :x: not started
> - :hammer: started
> - :white_check_mark: available

### Components

| Feature          | Notes                                                  | Status             | Demo                         |
|------------------|--------------------------------------------------------|        :---:       |------------------------------|
| alert            |                                                        |                :x: |                              |
| autocomplete     |                                                        |                :x: |                              |
| badge            |                                                        |                :x: |                              |
| button           |                                                        | :white_check_mark: |          [Demo][demo-button] |
| breadcrumbs      |                                                        |                :x: |                              |
| card             |                                                        | :white_check_mark: |            [Demo][demo-card] |
| chip             |                                                        |                :x: |                              |
| checkbox         |                                                        | :white_check_mark: |        [Demo][demo-checkbox] |
| copy             |                                                        | :white_check_mark: |            [Demo][demo-copy] |
| datavis          |                                                        |                :x: |                              |
| datepicker       |                                                        | :white_check_mark: |      [Demo][demo-datepicker] |
| date-range       |                                                        | :white_check_mark: |      [Demo][demo-date-range] |
| dialog           |                                                        |                :x: |                              |
| divider          |                                                        |                :x: |                              |
| expansion        |                                                        |                :x: |                              |
| file-picker      |                                                        |                :x: |                              |
| input-masking    |                                                        |                :x: |                              |
| input-messages   |         Used by `input` to display validation messages | :white_check_mark: |             (see input demo) |
| input            |                                                        | :white_check_mark: |           [Demo][demo-input] |
| link             |                                                        | :white_check_mark: |            [Demo][demo-link] |
| loading overlay  |                                                        | :white_check_mark: | [Demo][demo-loading-overlay] |
| login form       |                                                        | :white_check_mark: |     [Demo][demo-log-in-form] |
| menu             |                                                        | :white_check_mark: |            [Demo][demo-menu] |
| navigation       |                                                        | :white_check_mark: |      [Demo][demo-navigation] |
| paginator        |                                                        | :white_check_mark: |       [Demo][demo-paginator] |
| picklist         |                                                        |                :x: |                              |
| progress         |                                                        |                :x: |                              |
| progression      |                                                        |                :x: |                              |
| radio-group      |                                                        | :white_check_mark: |     [Demo][demo-radio-group] |
| search           |                                                        | :white_check_mark: |          [Demo][demo-search] |
| select           |                                                        | :white_check_mark: |          [Demo][demo-select] |
| sort             |               Used by `table` to manage column sorting | :white_check_mark: |             (see table demo) |
| table            |                                                        | :white_check_mark: |           [Demo][demo-table] |
| tabs             |                                                        |                :x: |                              |
| toggle           |                                                        | :white_check_mark: |          [Demo][demo-toggle] |
| tooltip          |                                                        | :white_check_mark: |         [Demo][demo-tooltip] |


### Pipes

| Pipe             | Notes                                                  | Status             | Demo                         |
|------------------|--------------------------------------------------------|        :---:       |------------------------------|
| `tsDate`         |             `short`, `medium`, `extended`, `timestamp` | :white_check_mark: |           [Demo][demo-pipes] |
| `tsTimeAgo`      |                             a human-readable time span | :white_check_mark: |           [Demo][demo-pipes] |


### Services

| Feature          | Notes                                                  | Status             |
|------------------|--------------------------------------------------------|        :---:       |
| Document         |           Provide access to the native document object | :white_check_mark: |
| Spacing          |              Expose custom spacing sizes via a service | :white_check_mark: |
| Validators       |    Expose custom validation methods for reactive forms | :white_check_mark: |
| Window           |             Provide access to the native window object | :white_check_mark: |


### TypeScript Utilities

| Feature          | Notes                                                  | Status             |
|------------------|--------------------------------------------------------|        :---:       |
| Interfaces       |      Provide TypeScript interfaces for various objects | :white_check_mark: |
| Types            |        Provide TypeScript types for various parameters | :white_check_mark: |


### Style Helpers

| Feature          | Notes                                                  | Status             |
|------------------|--------------------------------------------------------|        :---:       |
| animation        |                                                        | :white_check_mark: |
| assets           |                                                        | :white_check_mark: |
| breakpoints      |                                                        | :white_check_mark: |
| colors           |                                                        | :white_check_mark: |
| cursors          |                                                        | :white_check_mark: |
| layout           |                                                        | :white_check_mark: |
| shadows          |                                                        | :white_check_mark: |
| spacing          |                                                        | :white_check_mark: |
| typography       |                                                        | :white_check_mark: |
| z-index          |                                                        | :white_check_mark: |


## Installation

Install the library and all required dependencies:

```bash
$ yarn add @terminus/ui @angular/forms @angular/animations @angular/material hammerjs --exact
```


## Global Styles

To use the global styles, import the CSS file into your stylesheets:

```scss
@import '@terminus/ui/terminus-ui.css'
```


## SCSS Helpers

To use the provided SCSS helper methods/variables/mixins, import the helpers file from `@terminus/ui`:

```scss
@import '~@terminus/ui/helpers'
```

## Development Workflow

View the [wiki page][dev-wiki].


## Project Resources

- [Semantic Release][semantic-release] - Automatically release versioned release to NPM and generate
    a changelog in the Github tag.
- [Greenkeeper][greenkeeper] - Automatically keep dependencies up to date.
- [Commitizen][commitizen] - Interactive cli for enforcing commit message format.
- [Commitizen VSCode Plugin][commitizen_vsc] - VSCode plugin for commitizen.
- [SauceLabs Platforms][saucelab_platforms] - Cross-browser unit tests.
- [Nucleus][nucleus] - Generates SCSS documentation.
- [Doctoc][doctoc] - Generate documentation table of contents.
- [CodeCov][codecov] - Code coverage reporting.




<!-- LINKS -->

[circle-badge]: https://circleci.com/gh/GetTerminus/terminus-ui/tree/master.svg?style=shield
[circle-link]: https://circleci.com/gh/GetTerminus/terminus-ui/tree/master
[codecov-badge]: https://codecov.io/gh/GetTerminus/terminus-ui/branch/master/graph/badge.svg
[codecov-project]: https://codecov.io/gh/GetTerminus/terminus-ui
[codecov]: https://codecov.io
[codecov_browser]: https://docs.codecov.io/docs/browser-extension
[commitizen-cli]: https://github.com/commitizen/cz-cli
[commitizen]: https://github.com/commitizen
[commitizen_vsc]: https://github.com/commitizen
[compodoc-badge]: https://rawgit.com/GetTerminus/terminus-ui/master/docs/typescript/images/coverage-badge.svg
[compodoc]: https://compodoc.github.io/website/
[compodoc_comments]: https://compodoc.github.io/website/guides/comments.html
[component-demo-screenshot]: https://user-images.githubusercontent.com/270193/28672864-f05b73cc-72ae-11e7-8ead-efd1ee008f43.png
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog/blob/v0.5.3/conventions/angular.md
[dev-wiki]: https://github.com/GetTerminus/terminus-ui/wiki/Development-Workflow
[docs-url]: https://getterminus.github.io/terminus-ui/
[doctoc]: https://github.com/thlorenz/doctoc
[file-size-badge]: http://img.badgesize.io/https://unpkg.com/@terminus/ui/bundles/ui.umd.min.js?compression=gzip
[generator]: https://github.com/GetTerminus/generator-terminus-ui
[greenkeeper-badge]: https://badges.greenkeeper.io/GetTerminus/terminus-ui.svg
[greenkeeper]: https://greenkeeper.io/
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/GetTerminus/terminus-ui/blob/master/LICENSE
[markdown]: https://daringfireball.net/projects/markdown/syntax
[npm-url]: https://npmjs.org/package/@terminus/ui
[npm-version-image]: http://img.shields.io/npm/v/@terminus/ui.svg
[nucleus]: https://github.com/holidaypirates/nucleus/
[nucleus_annotation]: https://holidaypirates.github.io/nucleus/annotation-reference.html
[pkg-json]: https://github.com/GetTerminus/terminus-ui/blob/master/package.json
[raw-distribution-js]: https://unpkg.com/@terminus/ui/bundles/ui.umd.min.js
[saucelab_platforms]: https://saucelabs.com/platforms
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-video]: https://youtu.be/tc2UgG5L7WM
[semantic-release]: https://github.com/semantic-release/semantic-release
[semver]: http://semver.org/
[ui-github]: https://github.com/GetTerminus/terminus-ui
[ui-npm]: https://www.npmjs.com/package/@terminus/ui
[unpkg-terminus]: https://unpkg.com/@terminus/ui/
[validate-commit-msg]: https://github.com/kentcdodds/validate-commit-msg
[contributor-shield]: https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square

<!-- Demos -->
[demo-button]: https://terminus-ui-demos.stackblitz.io/components/button
[demo-card]: https://terminus-ui-demos.stackblitz.io/components/card
[demo-checkbox]: https://terminus-ui-demos.stackblitz.io/components/checkbox
[demo-copy]: https://terminus-ui-demos.stackblitz.io/components/copy
[demo-date-range]: https://terminus-ui-demos.stackblitz.io/components/date-range
[demo-datepicker]: https://terminus-ui-demos.stackblitz.io/components/datepicker
[demo-input]: https://terminus-ui-demos.stackblitz.io/components/input
[demo-link]: https://terminus-ui-demos.stackblitz.io/components/link
[demo-loading-overlay]: https://terminus-ui-demos.stackblitz.io/components/loading-overlay
[demo-log-in-form]: https://terminus-ui-demos.stackblitz.io/components/log-in-form
[demo-menu]: https://terminus-ui-demos.stackblitz.io/components/menu
[demo-navigation]: https://terminus-ui-demos.stackblitz.io/components/navigation
[demo-paginator]: https://terminus-ui-demos.stackblitz.io/components/paginator
[demo-radio-group]: https://terminus-ui-demos.stackblitz.io/components/radio
[demo-search]: https://terminus-ui-demos.stackblitz.io/components/search
[demo-select]: https://terminus-ui-demos.stackblitz.io/components/select
[demo-table]: https://terminus-ui-demos.stackblitz.io/components/table
[demo-toggle]: https://terminus-ui-demos.stackblitz.io/components/toggle
[demo-tooltip]: https://terminus-ui-demos.stackblitz.io/components/tooltip
[demo-pipes]: https://terminus-ui-demos.stackblitz.io/components/pipes


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/270193?s=460&v=4" width="100px;"/><br /><sub><b>Benjamin Charity</b></sub>](https://github.com/benjamincharity)<br />[💻](https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity "Code") [📖](https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity "Documentation") [⚠️](https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity "Tests") [🎨](#design-benjamincharity "Design") [🤔](#ideas-benjamincharity "Ideas, Planning, & Feedback") [👀](#review-benjamincharity "Reviewed Pull Requests") [🔧](#tool-benjamincharity "Tools") | [<img src="https://avatars1.githubusercontent.com/u/31667397?v=4" width="100px;"/><br /><sub><b>coreyterminator</b></sub>](https://github.com/coreyterminator)<br />[💻](https://github.com/GetTerminus/terminus-ui/commits?author=coreyterminator "Code") | [<img src="https://avatars0.githubusercontent.com/u/377552?v=4" width="100px;"/><br /><sub><b>Wendy</b></sub>](https://github.com/atlwendy)<br />[🐛](https://github.com/GetTerminus/terminus-ui/issues?q=author%3Aatlwendy "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/19909708?v=4" width="100px;"/><br /><sub><b>Brian Malinconico</b></sub>](https://github.com/bmalinconico)<br />[🐛](https://github.com/GetTerminus/terminus-ui/issues?q=author%3Abmalinconico "Bug reports") [🤔](#ideas-bmalinconico "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
