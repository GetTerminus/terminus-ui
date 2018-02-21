# Terminus UI Library


The library of UI components used for Terminus applications.

[![CircleCI][circle-badge]][circle-link]
[![codecov][codecov-badge]][codecov-project]
[![NPM version][npm-version-image]][npm-url]
[![Github release][gh-release-badge]][gh-releases]
[![Library size][file-size-badge]][raw-distribution-js]
[![semantic-release][semantic-release-badge]][semantic-release]
[![MIT License][license-image]][license-url]
[![All Contributors][contributor-shield]](#contributors)

---

[![components](https://img.shields.io/badge/Components-26-blue.svg)](#components)
[![pipes](https://img.shields.io/badge/Pipes-2-blue.svg)](#pipes)
[![services](https://img.shields.io/badge/Services-4-blue.svg)](#services)
[![style helpers](https://img.shields.io/badge/StylesHelpers-8-blue.svg)](#style-helpers)


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
- [Contributors](#contributors)
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

| Feature         | Notes                                          | Status             | Demo                         | Docs                         | Usage                       |
|-----------------|------------------------------------------------|:------------------:|------------------------------|------------------------------|-----------------------------|
| alert           |                                                | :x:                |                              |                              |                             |
| autocomplete    |                                                | :white_check_mark: | [Demo][demo-autocomplete]    | [Docs][autocomplete-docs]    | [Usage][autocomplete-usage] |
| autofocus       | Focus a focusable element on load              | :white_check_mark: | [Demo][demo-autofocus]       | [Docs][autofocus-docs]       | [Usage][autofocus-usage]    |
| badge           |                                                | :x:                |                              |                              |                             |
| button          |                                                | :white_check_mark: | [Demo][demo-button]          | [Docs][button-docs]          |                             |
| breadcrumbs     |                                                | :x:                |                              |                              |                             |
| card            |                                                | :white_check_mark: | [Demo][demo-card]            | [Docs][card-docs]            | [Usage][card-usage]         |
| chip            |                                                | :x:                |                              |                              |                             |
| checkbox        |                                                | :white_check_mark: | [Demo][demo-checkbox]        | [Docs][checkbox-docs]        | [Usage][checkbox-usage]     |
| copy            |                                                | :white_check_mark: | [Demo][demo-copy]            | [Docs][copy-docs]            |                             |
| datavis         |                                                | :x:                |                              |                              |                             |
| datepicker      |                                                | :white_check_mark: | [Demo][demo-datepicker]      | [Docs][datepicker-docs]      | [Usage][datepicker-usage]   |
| date-range      |                                                | :white_check_mark: | [Demo][demo-date-range]      | [Docs][date-range-docs]      | [Usage][date-range-usage]   |
| dialog          |                                                | :x:                |                              |                              |                             |
| divider         |                                                | :x:                |                              |                              |                             |
| expansion       |                                                | :x:                |                              |                              |                             |
| file-picker     |                                                | :x:                |                              |                              |                             |
| input-masking   |                                                | :x:                |                              |                              |                             |
| input-messages  | Used by `input` to display validation messages | :white_check_mark: | (see input demo)             |                              |                             |
| icon            | Valid icon names: https://material.io/icons    | :white_check_mark: | [Demo][demo-icon]            | [Docs][icon-docs]            | [Usage][icon-usage]         |
| icon-button     |                                                | :white_check_mark: | [Demo][demo-icon-button]     | [Docs][icon-button-docs]     | [Usage][icon-button-usage]  |
| input           |                                                | :white_check_mark: | [Demo][demo-input]           | [Docs][input-docs]           |                             |
| link            |                                                | :white_check_mark: | [Demo][demo-link]            | [Docs][link-docs]            |                             |
| loading overlay |                                                | :white_check_mark: | [Demo][demo-loading-overlay] | [Docs][loading-overlay-docs] |                             |
| login form      |                                                | :white_check_mark: | [Demo][demo-log-in-form]     | [Docs][login-form-docs]      |                             |
| menu            |                                                | :white_check_mark: | [Demo][demo-menu]            | [Docs][menu-docs]            |                             |
| navigation      |                                                | :white_check_mark: | [Demo][demo-navigation]      | [Docs][navigation-docs]      |                             |
| paginator       |                                                | :white_check_mark: | [Demo][demo-paginator]       | [Docs][paginator-docs]       |                             |
| progress        |                                                | :x:                |                              |                              |                             |
| progression     |                                                | :x:                |                              |                              |                             |
| radio-group     |                                                | :white_check_mark: | [Demo][demo-radio-group]     | [Docs][radio-group-docs]     | [Usage][radio-group-usage]  |
| search          |                                                | :white_check_mark: | [Demo][demo-search]          | [Docs][search-docs]          |                             |
| select          |                                                | :white_check_mark: | [Demo][demo-select]          | [Docs][select-docs]          |                             |
| spacing         | Helpers for consistent spacing                 | :white_check_mark: | [Demo][demo-spacing]         | [Docs][spacing-docs]         |                             |
| sort            | Used by `table` to manage column sorting       | :white_check_mark: | (see table demo)             | [Docs][sort-docs]            | [Usage][sort-usage]         |
| table           |                                                | :white_check_mark: | [Demo][demo-table]           | [Docs][table-docs]           | [Usage][table-usage]        |
| tabs            |                                                | :x:                |                              |                              |                             |
| toggle          |                                                | :white_check_mark: | [Demo][demo-toggle]          | [Docs][toggle-docs]          |                             |
| tooltip         |                                                | :white_check_mark: | [Demo][demo-tooltip]         | [Docs][tooltip-docs]         |                             |


### Pipes

| Pipe        | Notes                                      | Status             | Demo               |
|-------------|--------------------------------------------|:------------------:|--------------------|
| `tsDate`    | `short`, `medium`, `extended`, `timestamp` | :white_check_mark: | [Demo][demo-pipes] |
| `tsTimeAgo` | a human-readable time span                 | :white_check_mark: | [Demo][demo-pipes] |


### Services

| Feature    | Notes                                               | Status             |
|------------|-----------------------------------------------------|:------------------:|
| Document   | Provide access to the native document object        | :white_check_mark: |
| Spacing    | Expose custom spacing sizes via a service           | :white_check_mark: |
| Validators | Expose custom validation methods for reactive forms | :white_check_mark: |
| Window     | Provide access to the native window object          | :white_check_mark: |


### TypeScript Utilities

| Feature    | Notes                                             | Status             |
|------------|---------------------------------------------------|:------------------:|
| Interfaces | Provide TypeScript interfaces for various objects | :white_check_mark: |
| Types      | Provide TypeScript types for various parameters   | :white_check_mark: |


### Style Helpers

| Feature     | Notes | Status             | Docs                     |
|-------------|-------|:------------------:|--------------------------|
| animation   |       | :hammer:           |                          |
| assets      |       | :hammer:           |                          |
| breakpoints |       | :white_check_mark: | [Docs][breakpoints-docs] |
| colors      |       | :white_check_mark: | [Docs][color-docs]       |
| cursors     |       | :white_check_mark: | [Docs][cursors-docs]     |
| layout      |       | :white_check_mark: | [Docs][layout-docs]      |
| shadows     |       | :white_check_mark: | [Docs][shadows-docs]     |
| spacing     |       | :white_check_mark: | [Docs][spacing-docs]     |
| typography  |       | :white_check_mark: | [Docs][typography-docs]  |
| z-index     |       | :white_check_mark: | [Docs][z-index-docs]     |


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


## Contributors

Thanks goes to these wonderful people ([emoji key][all-contributors-key]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/270193?s=460&v=4" width="100px;"/><br /><sub><b>Benjamin Charity</b></sub>](https://github.com/benjamincharity)<br />[💻](https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity "Code") [📖](https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity "Documentation") [⚠️](https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity "Tests") [🎨](#design-benjamincharity "Design") [🤔](#ideas-benjamincharity "Ideas, Planning, & Feedback") [👀](#review-benjamincharity "Reviewed Pull Requests") [🔧](#tool-benjamincharity "Tools") | [<img src="https://avatars1.githubusercontent.com/u/31667397?v=4" width="100px;"/><br /><sub><b>coreyterminator</b></sub>](https://github.com/coreyterminator)<br />[💻](https://github.com/GetTerminus/terminus-ui/commits?author=coreyterminator "Code") | [<img src="https://avatars0.githubusercontent.com/u/377552?v=4" width="100px;"/><br /><sub><b>Wendy</b></sub>](https://github.com/atlwendy)<br />[🐛](https://github.com/GetTerminus/terminus-ui/issues?q=author%3Aatlwendy "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/19909708?v=4" width="100px;"/><br /><sub><b>Brian Malinconico</b></sub>](https://github.com/bmalinconico)<br />[🐛](https://github.com/GetTerminus/terminus-ui/issues?q=author%3Abmalinconico "Bug reports") [🤔](#ideas-bmalinconico "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/2921?v=4" width="100px;"/><br /><sub><b>David Harkness</b></sub>](http://rubykata.wordpress.com/)<br />[💻](https://github.com/GetTerminus/terminus-ui/commits?author=david-harkness "Code") | [<img src="https://avatars0.githubusercontent.com/u/14012571?v=4" width="100px;"/><br /><sub><b>kal93</b></sub>](https://github.com/kal93)<br />[🐛](https://github.com/GetTerminus/terminus-ui/issues?q=author%3Akal93 "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!


## Project Resources

- [Semantic Release][semantic-release] - Automatically release versioned release to NPM and generate
    a changelog in the Github tag.
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
[all-contributors-key]: https://github.com/kentcdodds/all-contributors#emoji-key
[gh-release-badge]: https://img.shields.io/github/release/GetTerminus/terminus-ui.svg
[gh-releases]: https://github.com/GetTerminus/terminus-ui/releases/


<!-- Demos -->
[demo-autocomplete]: https://terminus-ui-demos.stackblitz.io/components/autocomplete
[demo-autofocus]: https://terminus-ui-demos.stackblitz.io/components/autofocus
[demo-button]: https://terminus-ui-demos.stackblitz.io/components/button
[demo-card]: https://terminus-ui-demos.stackblitz.io/components/card
[demo-checkbox]: https://terminus-ui-demos.stackblitz.io/components/checkbox
[demo-copy]: https://terminus-ui-demos.stackblitz.io/components/copy
[demo-date-range]: https://terminus-ui-demos.stackblitz.io/components/date-range
[demo-datepicker]: https://terminus-ui-demos.stackblitz.io/components/datepicker
[demo-icon-button]: https://terminus-ui-demos.stackblitz.io/components/icon-button
[demo-icon]: https://terminus-ui-demos.stackblitz.io/components/icon
[demo-input]: https://terminus-ui-demos.stackblitz.io/components/input
[demo-link]: https://terminus-ui-demos.stackblitz.io/components/link
[demo-loading-overlay]: https://terminus-ui-demos.stackblitz.io/components/loading-overlay
[demo-log-in-form]: https://terminus-ui-demos.stackblitz.io/components/log-in-form
[demo-menu]: https://terminus-ui-demos.stackblitz.io/components/menu
[demo-navigation]: https://terminus-ui-demos.stackblitz.io/components/navigation
[demo-paginator]: https://terminus-ui-demos.stackblitz.io/components/paginator
[demo-pipes]: https://terminus-ui-demos.stackblitz.io/components/pipes
[demo-radio-group]: https://terminus-ui-demos.stackblitz.io/components/radio
[demo-search]: https://terminus-ui-demos.stackblitz.io/components/search
[demo-select]: https://terminus-ui-demos.stackblitz.io/components/select
[demo-spacing]: https://terminus-ui-demos.stackblitz.io/components/spacing
[demo-table]: https://terminus-ui-demos.stackblitz.io/components/table
[demo-toggle]: https://terminus-ui-demos.stackblitz.io/components/toggle
[demo-tooltip]: https://terminus-ui-demos.stackblitz.io/components/tooltip


<!-- SCSS Docs -->
[breakpoints-docs]: ./src/lib/src/scss/docs/breakpoints.md
[color-docs]: ./src/lib/src/scss/docs/color.md
[cursors-docs]: ./src/lib/src/scss/docs/cursors.md
[layout-docs]: ./src/lib/src/scss/docs/layout.md
[shadows-docs]: ./src/lib/src/scss/docs/shadows.md
[spacing-docs]: ./src/lib/src/scss/docs/spacing.md
[typography-docs]: ./src/lib/src/scss/docs/typography.md
[z-index-docs]: ./src/lib/src/scss/docs/z-index.md

<!-- TS Primary Docs -->
[autocomplete-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsAutocompleteComponent.html
[autofocus-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsAutocompleteComponent.html
[button-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsButtonComponent.html
[card-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsCardComponent.html
[checkbox-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsCheckboxComponent.html
[copy-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsCopyComponent.html
[date-range-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsDateRangeComponent.html
[datepicker-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsDatepickerComponent.html
[icon-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsIconComponent.html
[icon-button-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsIconButtonComponent.html
[input-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsInputComponent.html
[link-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsLinkComponent.html
[loading-overlay-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsLoadingOverlayComponent.html
[login-form-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsLoginFormComponent.html
[menu-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsMenuComponent.html
[navigation-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsNavigationComponent.html
[paginator-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsPaginatorComponent.html
[radio-group-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsRadioGroupComponent.html
[search-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsSearchComponent.html
[select-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsSelectComponent.html
[sort-docs]: https://getterminus.github.io/terminus-ui/typescript/directives/TsSortDirective.html
[spacing-docs]: https://getterminus.github.io/terminus-ui/typescript/directives/TsVerticalSpacingDirective.html
[table-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsTableComponent.html
[toggle-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsToggleComponent.html
[tooltip-docs]: https://getterminus.github.io/terminus-ui/typescript/components/TsTooltipComponent.html

<!-- TS Usage Docs -->
[autocomplete-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsAutocompleteComponent.html#readme
[autofocus-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsAutofocusDirective.html#readme
[card-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsCardComponent.html#readme
[checkbox-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsCheckboxComponent.html#readme
[date-range-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsDateRangeComponent.html#readme
[datepicker-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsDatepickerComponent.html#readme
[icon-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsIconComponent.html#readme
[icon-button-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsIconButtonComponent.html#readme
[radio-group-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsRadioGroupComponent.html#readme
[sort-usage]: https://getterminus.github.io/terminus-ui/typescript/directives/TsSortDirective.html#readme
[table-usage]: https://getterminus.github.io/terminus-ui/typescript/components/TsTableComponent.html#readme
