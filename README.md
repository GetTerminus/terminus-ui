# Terminus UI Library


The library of UI components used for Terminus applications.

[![CircleCI][circle-badge]][circle-link]
[![codecov][codecov-badge]][codecov-project]
[![semantic-release][semantic-release-badge]][semantic-release]
[![MIT License][license-image]][license-url]
[![ZenHub][zenhub-image]][zenhub-url]
<br>
[![NPM version][npm-version-image]][npm-url]
[![Github release][gh-release-badge]][gh-releases]
[![Library size][file-size-badge]][raw-distribution-js]
<br>
[![components](https://img.shields.io/badge/Components-35-%2316a085.svg)](#components)
[![pipes](https://img.shields.io/badge/Pipes-6-%2316a085.svg)](#pipes)
[![services](https://img.shields.io/badge/Services-1-%2316a085.svg)](#services)
[![style helpers](https://img.shields.io/badge/StyleHelpers-14-%2316a085.svg)](#style-helpers)
[![validators](https://img.shields.io/badge/Validators-15-%2316a085.svg)](#validators)

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Library Purpose](#library-purpose)
- [Documentation](#documentation)
  - [Versioned Documentation and Demos](#versioned-documentation-and-demos)
- [Available Features](#available-features)
  - [Components](#components)
  - [Pipes](#pipes)
  - [Services](#services)
    - [Available Validators](#available-validators)
  - [Constants](#constants)
  - [Style Helpers](#style-helpers)
- [Installation](#installation)
  - [Fonts and Typefaces](#fonts-and-typefaces)
  - [Global Styles](#global-styles)
- [SCSS Helpers](#scss-helpers)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [Project Resources](#project-resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Library Purpose

This library was created to assist Terminus engineers in maintaining a consistent experience across
applications while following a unified design language.

The library is open source with the hopes that others may find solutions and ideas here, as we have
done while browsing so many other repositories. While we want to make decisions that are best for
everyone, in the end, the needs of the Terminus engineering team must come first.

If a deviation makes sense for the feature itself, but not for Terminus, we support (and will assist
in) abstracting the functionality out for generalization.

This library is heavily based on Material Design currently. This provides us a way to rely on very
well thought out usability and accessibility decisions for areas we have not yet addressed
internally. While we hold Material in high regard, we do not believe that all of their decisions are
best for the Terminus UI specifically.


## Documentation

The [available features table](#available-features) contains links for functional and usage documentation
for each feature.

### Versioned Documentation and Demos

- `latest`
  - [Latest TypeScript Documentation][docs-latest]
  - [Latest Demos][demo-latest]


## Available Features

> - :hammer: started
> - :white_check_mark: available
> - :hankey: deprecated

### Components

| Feature                                | Notes                                                     | Status             | Demo                            | Docs                         | Usage                          |
|----------------------------------------|-----------------------------------------------------------|:------------------:|---------------------------------|------------------------------|--------------------------------|
| alert                                  |                                                           |                    |                                 |                              |                                |
| [autocomplete][src-autocomplete]       | An input with suggestions                                 | :white_check_mark: | [Demo][demo-autocomplete]       | [Docs][autocomplete-docs]    | [Usage][autocomplete-usage]    |
| [autofocus][src-autofocus]             | Focus a focusable element on load                         | :white_check_mark: | [Demo][demo-autofocus]          | [Docs][autofocus-docs]       | [Usage][autofocus-usage]       |
| badge                                  |                                                           |                    |                                 |                              |                                |
| [button][src-button]                   |                                                           | :white_check_mark: | [Demo][demo-button]             | [Docs][button-docs]          |                                |
| breadcrumbs                            |                                                           |                    |                                 |                              |                                |
| [card][src-card]                       |                                                           | :white_check_mark: | [Demo][demo-card]               | [Docs][card-docs]            | [Usage][card-usage]            |
| [chart][src-chart]                     | Charts, graphs etc                                        | :white_check_mark: | [Demo][demo-chart]              | [Docs][chart-docs]           | [Usage][chart-usage]           |
| [chip][src-chip]                       | Chip                                                      | :white_check_mark: | [Demo][demo-chip]               | [Docs][chip-docs]            | [Usage][chip-usage]            |
| [checkbox][src-checkbox]               |                                                           | :white_check_mark: | [Demo][demo-checkbox]           | [Docs][checkbox-docs]        | [Usage][checkbox-usage]        |
| [confirmation][src-confirmation]       | Add a confirmation step to any `ts-button`                | :white_check_mark: | [Demo][demo-confirmation]       | [Docs][confirmation-docs]    | [Usage][confirmation-usage]    |
| [copy][src-copy]                       |                                                           | :white_check_mark: | [Demo][demo-copy]               | [Docs][copy-docs]            |                                |
| [csv entry][src-csv-entry]             | Manually enter CSV values                                 | :white_check_mark: | [Demo][demo-csv-entry]          | [Docs][csv-entry-docs]       | [Usage][csv-entry-usage]       |
| [datepicker][src-input]                | See `TsInputComponent`                                    | :white_check_mark: | [Demo][demo-input]              | [Docs][input-docs]           | [Usage][input-usage]           |
| [date-range][src-date-range]           | Dual inputs with calendar pop-ups                         | :white_check_mark: | [Demo][demo-date-range]         | [Docs][date-range-docs]      | [Usage][date-range-usage]      |
| dialog                                 |                                                           |                    |                                 |                              |                                |
| divider                                |                                                           |                    |                                 |                              |                                |
| [expansion-panel][src-expansion-panel] | An expansion panel and accordion functionality            | :white_check_mark: | [Demo][demo-expansion-panel]    | [Docs][expansion-panel-docs] | [Usage][expansion-panel-usage] |
| [file-upload][src-file-upload]         | File upload with drag and drop                            | :white_check_mark: | [Demo][demo-file-upload]        | [Docs][file-upload-docs]     | [Usage][file-upload-usage]     |
| [icon][src-icon]                       | Supported icons: https://material.io/icons                | :white_check_mark: | [Demo][demo-icon]               | [Docs][icon-docs]            | [Usage][icon-usage]            |
| [icon-button][src-button]              |                                                           | :white_check_mark: | [Demo][demo-icon-button]        | [Docs][icon-button-docs]     | [Usage][icon-button-usage]     |
| [input][src-input]                     |                                                           | :white_check_mark: | [Demo][demo-input]              | [Docs][input-docs]           | [Usage][input-usage]           |
| [link][src-link]                       |                                                           | :white_check_mark: | [Demo][demo-link]               | [Docs][link-docs]            | [Usage][link-usage]            |
| [loading overlay][src-loading-overlay] | Overlay with loading spinner                              | :white_check_mark: | [Demo][demo-loading-overlay]    | [Docs][loading-overlay-docs] |                                |
| [login form][src-login-form]           | Email/password with 'remember me' checkbox                | :white_check_mark: | [Demo][demo-log-in-form]        | [Docs][login-form-docs]      |                                |
| [logo][src-logo]                       | Variations of the official logo, certain colors available | :white_check_mark: | [Demo][demo-logo]               | [Docs][logo-docs]            | [Usage][logo-usage]            |
| [menu][src-menu]                       |                                                           | :white_check_mark: | [Demo][demo-menu]               | [Docs][menu-docs]            | [Usage][menu-usage]            |
| [navigation][src-navigation]           | Global navigation menu                                    | :white_check_mark: | [Demo][demo-navigation]         | [Docs][navigation-docs]      | [Usage][navigation-usage]      |
| [paginator][src-paginator]             | Paging controls for collections                           | :white_check_mark: | [Demo][demo-paginator]          | [Docs][paginator-docs]       | [Usage][paginator-usage]       |
| [pipes][src-pipes]                     | A collection of pipes for Angular                         | :white_check_mark: | [Demo][demo-pipes]              | [Docs][pipes-docs]           |                                |
| progress                               |                                                           |                    |                                 |                              |                                |
| progression                            | i.e. Stepper, wizard                                      |                    |                                 |                              |                                |
| [radio-group][src-radio-group]         |                                                           | :white_check_mark: | [Demo][demo-radio-group]        | [Docs][radio-group-docs]     | [Usage][radio-group-usage]     |
| [scrollbars][src-scrollbars]           | Custom scrollars for both axis'                           | :white_check_mark: | [Demo][demo-scrollbars]         | [Docs][scrollbars-docs]      | [Usage][scrollbars-usage]      |
| [search][src-search]                   | Input with search capabilities                            | :white_check_mark: | [Demo][demo-search]             | [Docs][search-docs]          |                                |
| [select][src-select]                   | Classic select menu with optgroup support                 | :white_check_mark: | [Demo][demo-select]             | [Docs][select-docs]          |                                |
| [spacing][src-spacing]                 | Helpers for consistent spacing                            | :white_check_mark: | [Demo][demo-spacing]            | [Docs][spacing-docs]         |                                |
| [sort][src-sort]                       | Used by `table` for column sorting                        | :white_check_mark: | <small>(see table demo)</small> | [Docs][sort-docs]            | [Usage][sort-usage]            |
| [table][src-table]                     |                                                           | :white_check_mark: | [Demo][demo-table]              | [Docs][table-docs]           | [Usage][table-usage]           |
| [tabs][src-tabs]                       | Horizontal tab interface                                  | :white_check_mark: | [Demo][demo-tabs]               | [Docs][tabs-docs]            | [Usage][tabs-usage]            |
| textarea                               | See `input`                                               |                    | <small>(see input demo)</small> |                              |                                |
| [toggle][src-toggle]                   |                                                           | :white_check_mark: | [Demo][demo-toggle]             | [Docs][toggle-docs]          |                                |
| [tooltip][src-tooltip]                 |                                                           | :white_check_mark: | [Demo][demo-tooltip]            | [Docs][tooltip-docs]         |                                |


### Pipes

[:books: Pipes Documentation][pipes-docs]
<br>
[:circus_tent: Pipes Demo][demo-pipes]

| Pipe                                       | Notes                                       | Status             |
|--------------------------------------------|---------------------------------------------|:------------------:|
| [`tsDate`][src-pipes-date]                 | `short`, `medium`, `extended`, `timestamp`  | :white_check_mark: |
| [`tsRoundNumber`][src-pipes-roundNumber]   | Round a number to a specific precision      | :white_check_mark: |
| [`tsSentenceCase`][src-pipes-sentenceCase] | Convert string casing to sentence-case      | :white_check_mark: |
| [`tsTimeAgo`][src-pipes-timeAgo]           | Human-readable time span                    | :white_check_mark: |
| [`tsTitleCase`][src-pipes-titleCase]       | Title Case A String                         | :white_check_mark: |
| [`tsTruncateAt`][src-pipes-truncate]       | Truncate a string, `start`, `middle`, `end` | :white_check_mark: |


### Services

| Feature                      | Notes                                               | Status             | Demo                    | Docs                    | Usage                     |
|------------------------------|-----------------------------------------------------|:------------------:|-------------------------|-------------------------|---------------------------|
| [Validators][src-validators] | Expose custom validation methods for reactive forms | :white_check_mark: | [Demo][demo-validators] | [Docs][validators-docs] | [Usage][validators-usage] |


#### Available Validators

| Name             | Purpose                                                       | Status             |
|------------------|---------------------------------------------------------------|:------------------:|
| `creditCard`     | A credit card number must be valid                            | :white_check_mark: |
| `domain`         | A domain must be valid                                        | :white_check_mark: |
| `email`          | An email address must be valid                                | :white_check_mark: |
| `equalToControl` | A control's value must be equal to another control's value    | :white_check_mark: |
| `greaterThan`    | A number must be greater than another value                   | :white_check_mark: |
| `inCollection`   | A value must be found in a collection                         | :white_check_mark: |
| `isInRange`      | A number must be between two numbers                          | :white_check_mark: |
| `lessThan`       | A number must be less than another value                      | :white_check_mark: |
| `lowercase`      | A value must contain a minimum amount of lowercase characters | :white_check_mark: |
| `maxDate`        | A date must be before a maximum date                          | :white_check_mark: |
| `minDate`        | A date must be after a minimum date                           | :white_check_mark: |
| `numbers`        | A value must contain a minimum amount of numbers              | :white_check_mark: |
| `password`       | A password must meet certain requirements                     | :white_check_mark: |
| `uppercase`      | A value must contain a minimum amount of uppercase characters | :white_check_mark: |
| `url`            | A URL must be valid                                           | :white_check_mark: |


### Constants

| Feature      | Notes                                  | Status             | Demo                          | Docs | Usage |
|--------------|----------------------------------------|:------------------:|-------------------------------|------|-------|
| `TS_SPACING` | Expose our spacing sizes in TypeScript | :white_check_mark: | [Demo][demo-spacing-constant] |      |       |


### Style Helpers

| Feature            | Notes                       | Status             | Docs                     |
|--------------------|-----------------------------|:------------------:|--------------------------|
| a11y               | Accessibility helpers       | :white_check_mark: |                          |
| animation          |                             | :hammer:           |                          |
| assets             |                             | :hammer:           |                          |
| breakpoints        |                             | :white_check_mark: | [Docs][breakpoints-docs] |
| colors             |                             | :white_check_mark: | [Docs][color-docs]       |
| cursors            |                             | :white_check_mark: | [Docs][cursors-docs]     |
| input-placeholder  |                             | :white_check_mark: |                          |
| layout             |                             | :white_check_mark: | [Docs][layout-docs]      |
| opposite-direction | Reverse a direction         | :white_check_mark: |                          |
| shadows            |                             | :white_check_mark: | [Docs][shadows-docs]     |
| spacing            |                             | :white_check_mark: | [Docs][spacing-docs]     |
| triangle           | Create a triangle using CSS | :white_check_mark: |                          |
| typography         |                             | :white_check_mark: | [Docs][typography-docs]  |
| z-index            |                             | :white_check_mark: | [Docs][z-index-docs]     |


## Installation

Install the library and required dependencies:

```bash
# Primary dependencies:
$ yarn add @terminus/ui @terminus/ngx-tools

# Peer dependencies that will need to be installed (needed by UI and tools libraries):
$ yarn add @angular/cdk @angular/material @angular/flex-layout@8.0.0-beta.26 date-fns@2.0.0-alpha.26 @ngrx/effects @ngrx/store hammerjs

# Optional dependencies (needed if using the TsChartComponent):
$ yarn add @amcharts/amcharts4 @amcharts/amcharts4-geodata
```


### Fonts and Typefaces

Add the following links to install the body fonts and icon fonts used by the library:

```html
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```


### Global Styles

To use the global styles, import the CSS file into your stylesheets:

```scss
@import '@terminus/ui/terminus-ui.css'
```


## SCSS Helpers

To use the provided SCSS helper methods/variables/mixins, import the helpers file from `@terminus/ui`:

```scss
@import '~@terminus/ui/helpers'
```

## Contributing

View the [contribution documentation][contributing] and the [development documentation][dev-workflow].


## Contributors

Thanks goes to these wonderful people ([emoji key][all-contributors-key]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/benjamincharity"><img src="https://avatars1.githubusercontent.com/u/270193?s=460&v=4" width="100px;" alt="Benjamin Charity"/><br /><sub><b>Benjamin Charity</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity" title="Code">💻</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity" title="Documentation">📖</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity" title="Tests">⚠️</a> <a href="#design-benjamincharity" title="Design">🎨</a> <a href="#ideas-benjamincharity" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-benjamincharity" title="Reviewed Pull Requests">👀</a> <a href="#tool-benjamincharity" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/coreyterminator"><img src="https://avatars1.githubusercontent.com/u/31667397?v=4" width="100px;" alt="coreyterminator"/><br /><sub><b>coreyterminator</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/commits?author=coreyterminator" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/atlwendy"><img src="https://avatars0.githubusercontent.com/u/377552?v=4" width="100px;" alt="Wendy"/><br /><sub><b>Wendy</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Aatlwendy" title="Bug reports">🐛</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=atlwendy" title="Code">💻</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=atlwendy" title="Documentation">📖</a> <a href="#ideas-atlwendy" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-atlwendy" title="Maintenance">🚧</a> <a href="#review-atlwendy" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=atlwendy" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/bmalinconico"><img src="https://avatars0.githubusercontent.com/u/19909708?v=4" width="100px;" alt="Brian Malinconico"/><br /><sub><b>Brian Malinconico</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Abmalinconico" title="Bug reports">🐛</a> <a href="#ideas-bmalinconico" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://rubykata.wordpress.com/"><img src="https://avatars0.githubusercontent.com/u/2921?v=4" width="100px;" alt="David Harkness"/><br /><sub><b>David Harkness</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/commits?author=david-harkness" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kal93"><img src="https://avatars0.githubusercontent.com/u/14012571?v=4" width="100px;" alt="kal93"/><br /><sub><b>kal93</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Akal93" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/divyameher"><img src="https://avatars0.githubusercontent.com/u/24610542?v=4" width="100px;" alt="divyameher"/><br /><sub><b>divyameher</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Adivyameher" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/dpeet"><img src="https://avatars2.githubusercontent.com/u/4729779?v=4" width="100px;" alt="Devon Peet"/><br /><sub><b>Devon Peet</b></sub></a><br /><a href="#design-dpeet" title="Design">🎨</a> <a href="#ideas-dpeet" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/deanterm"><img src="https://avatars2.githubusercontent.com/u/41060343?v=4" width="100px;" alt="dean jones"/><br /><sub><b>dean jones</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/commits?author=deanterm" title="Code">💻</a> <a href="#ideas-deanterm" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=deanterm" title="Tests">⚠️</a> <a href="#design-deanterm" title="Design">🎨</a> <a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Adeanterm" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/shani-terminus"><img src="https://avatars3.githubusercontent.com/u/44702601?v=4" width="100px;" alt="shani-terminus"/><br /><sub><b>shani-terminus</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Ashani-terminus" title="Bug reports">🐛</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=shani-terminus" title="Code">💻</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=shani-terminus" title="Documentation">📖</a> <a href="#example-shani-terminus" title="Examples">💡</a> <a href="#review-shani-terminus" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=shani-terminus" title="Tests">⚠️</a> <a href="#ideas-shani-terminus" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-shani-terminus" title="Maintenance">🚧</a> <a href="#tool-shani-terminus" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/edwin-terminus"><img src="https://avatars1.githubusercontent.com/u/41646583?v=4" width="100px;" alt="edwin-terminus"/><br /><sub><b>edwin-terminus</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Aedwin-terminus" title="Bug reports">🐛</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=edwin-terminus" title="Code">💻</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=edwin-terminus" title="Documentation">📖</a> <a href="#example-edwin-terminus" title="Examples">💡</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=edwin-terminus" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!


## Project Resources

- [Semantic Release][semantic-release] - Automatically release versioned release to NPM and generate
    a changelog in the Github tag.
- [Commitizen][commitizen] - Interactive cli for enforcing commit message format.
- [Commitizen VSCode Plugin][commitizen_vsc] - VSCode plugin for commitizen.
- [Doctoc][doctoc] - Generate documentation table of contents.
- [CodeCov][codecov] - Code coverage reporting.




<!--
  LINKS
-->

<!-- PROJECT -->
[circle-link]:               https://circleci.com/gh/GetTerminus/terminus-ui/tree/release
[codecov-project]:           https://codecov.io/gh/GetTerminus/terminus-ui
[component-demo-screenshot]: https://user-images.githubusercontent.com/270193/28672864-f05b73cc-72ae-11e7-8ead-efd1ee008f43.png
[dev-workflow]:              https://github.com/GetTerminus/terminus-ui/blob/release/DEVELOPMENT.md
[contributing]:              https://github.com/GetTerminus/terminus-ui/blob/release/CONTRIBUTING.md
[license-url]:               https://github.com/GetTerminus/terminus-ui/blob/release/LICENSE
[pkg-json]:                  https://github.com/GetTerminus/terminus-ui/blob/release/package.json
[docs-url]:                  http://uilibrary-docs.terminus.ninja/release/
[generator]:                 https://github.com/GetTerminus/generator-terminus-ui
[npm-url]:                   https://npmjs.org/package/@terminus/ui
[raw-distribution-js]:       https://unpkg.com/@terminus/ui/bundles/terminus-ui.umd.min.js
[ui-github]:                 https://github.com/GetTerminus/terminus-ui
[ui-npm]:                    https://www.npmjs.com/package/@terminus/ui
[unpkg-terminus]:            https://unpkg.com/@terminus/ui/

<!-- BADGES -->
[circle-badge]:           https://circleci.com/gh/GetTerminus/terminus-ui/tree/release.svg?style=shield
[codecov-badge]:          https://codecov.io/gh/GetTerminus/terminus-ui/branch/release/graph/badge.svg
[compodoc-badge]:         https://rawgit.com/GetTerminus/terminus-ui/release/docs/images/coverage-badge.svg
[file-size-badge]:        http://img.badgesize.io/https://unpkg.com/@terminus/ui/bundles/terminus-ui.umd.min.js?compression=gzip
[npm-version-image]:      http://img.shields.io/npm/v/@terminus/ui.svg
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[license-image]:          http://img.shields.io/badge/license-MIT-blue.svg
[gh-release-badge]:       https://img.shields.io/github/release/GetTerminus/terminus-ui.svg
[gh-releases]:            https://github.com/GetTerminus/terminus-ui/releases/
[zenhub-image]:           https://dxssrr2j0sq4w.cloudfront.net/3.2.0/img/external/zenhub-badge.png
[zenhub-url]:             https://github.com/GetTerminus/terminus-ui#zenhub

<!-- 3RD PARTY -->
[codecov]:                https://codecov.io
[codecov_browser]:        https://docs.codecov.io/docs/browser-extension
[commitizen-cli]:         https://github.com/commitizen/cz-cli
[commitizen]:             https://github.com/commitizen
[commitizen_vsc]:         https://github.com/KnisterPeter/vscode-commitizen
[compodoc]:               https://compodoc.github.io/website/
[compodoc_comments]:      https://compodoc.github.io/website/guides/comments.html
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog/blob/v0.5.3/conventions/angular.md
[doctoc]:                 https://github.com/thlorenz/doctoc
[markdown]:               https://daringfireball.net/projects/markdown/syntax
[semantic-release-video]: https://youtu.be/tc2UgG5L7WM
[semantic-release]:       https://github.com/semantic-release/semantic-release
[semver]:                 http://semver.org/
[validate-commit-msg]:    https://github.com/kentcdodds/validate-commit-msg
[all-contributors-key]:   https://github.com/kentcdodds/all-contributors#emoji-key

<!-- Demos -->
[demo-autocomplete]:     https://getterminus.github.io/ui-demos-release/components/autocomplete
[demo-autofocus]:        https://getterminus.github.io/ui-demos-release/components/autofocus
[demo-button]:           https://getterminus.github.io/ui-demos-release/components/button
[demo-card]:             https://getterminus.github.io/ui-demos-release/components/card
[demo-chart]:            https://getterminus.github.io/ui-demos-release/components/chart
[demo-chip]:             https://getterminus.github.io/ui-demos-release/components/chip
[demo-checkbox]:         https://getterminus.github.io/ui-demos-release/components/checkbox
[demo-confirmation]:     https://getterminus.github.io/ui-demos-release/components/confirmation
[demo-copy]:             https://getterminus.github.io/ui-demos-release/components/copy
[demo-csv-entry]:        https://getterminus.github.io/ui-demos-release/components/csv-entry
[demo-date-range]:       https://getterminus.github.io/ui-demos-release/components/date-range
[demo-datepicker]:       https://getterminus.github.io/ui-demos-release/components/datepicker
[demo-expansion-panel]:  https://getterminus.github.io/ui-demos-release/components/expansion-panel
[demo-file-upload]:      https://getterminus.github.io/ui-demos-release/components/file-upload
[demo-icon-button]:      https://getterminus.github.io/ui-demos-release/components/icon-button
[demo-icon]:             https://getterminus.github.io/ui-demos-release/components/icon
[demo-input]:            https://getterminus.github.io/ui-demos-release/components/input
[demo-link]:             https://getterminus.github.io/ui-demos-release/components/link
[demo-loading-overlay]:  https://getterminus.github.io/ui-demos-release/components/loading-overlay
[demo-log-in-form]:      https://getterminus.github.io/ui-demos-release/components/log-in-form
[demo-logo]:             https://getterminus.github.io/ui-demos-release/components/logo
[demo-menu]:             https://getterminus.github.io/ui-demos-release/components/menu
[demo-navigation]:       https://getterminus.github.io/ui-demos-release/components/navigation
[demo-paginator]:        https://getterminus.github.io/ui-demos-release/components/paginator
[demo-pipes]:            https://getterminus.github.io/ui-demos-release/components/pipes
[demo-radio-group]:      https://getterminus.github.io/ui-demos-release/components/radio
[demo-scrollbars]:       https://getterminus.github.io/ui-demos-release/components/scrollbars
[demo-search]:           https://getterminus.github.io/ui-demos-release/components/search
[demo-select]:           https://getterminus.github.io/ui-demos-release/components/select
[demo-spacing-constant]: https://getterminus.github.io/ui-demos-release/components/spacing-constant
[demo-spacing]:          https://getterminus.github.io/ui-demos-release/components/spacing
[demo-table]:            https://getterminus.github.io/ui-demos-release/components/table
[demo-tabs]:             https://getterminus.github.io/ui-demos-release/components/tabs
[demo-toggle]:           https://getterminus.github.io/ui-demos-release/components/toggle
[demo-tooltip]:          https://getterminus.github.io/ui-demos-release/components/tooltip
[demo-validators]:       https://getterminus.github.io/ui-demos-release/components/validation

<!-- SCSS Docs -->
[breakpoints-docs]: https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/scss/docs/breakpoints.md
[color-docs]:       https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/scss/docs/color.md
[cursors-docs]:     https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/scss/docs/cursors.md
[layout-docs]:      https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/scss/docs/layout.md
[shadows-docs]:     https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/scss/docs/shadows.md
[spacing-docs]:     https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/scss/docs/spacing.md
[typography-docs]:  https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/scss/docs/typography.md
[z-index-docs]:     https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/scss/docs/z-index.md

<!-- Source Directories -->
[src-autocomplete]:       ./terminus-ui/autocomplete/src/
[src-autofocus]:          ./terminus-ui/autofocus/src/
[src-button]:             ./terminus-ui/button/src/
[src-card]:               ./terminus-ui/card/src/
[src-chart]:              ./terminus-ui/chart/src/
[src-checkbox]:           ./terminus-ui/checkbox/src/
[src-chip]:               ./terminus-ui/chip/src
[src-confirmation]:       ./terminus-ui/confirmation/src/
[src-copy]:               ./terminus-ui/copy/src/
[src-csv-entry]:          ./terminus-ui/csv-entry/src/
[src-date-range]:         ./terminus-ui/date-range/src/
[src-expansion-panel]:    ./terminus-ui/expansion-panel/src/
[src-file-upload]:        ./terminus-ui/file-upload/src/
[src-icon-button]:        ./terminus-ui/icon-button/src/
[src-icon]:               ./terminus-ui/src/icon/src/
[src-input]:              ./terminus-ui/input/src/
[src-link]:               ./terminus-ui/link/src/
[src-loading-overlay]:    ./terminus-ui/loading-overlay/src/
[src-login-form]:         ./terminus-ui/login-form/src/
[src-logo]:               ./terminus-ui/logo/src/
[src-menu]:               ./terminus-ui/menu/src/
[src-navigation]:         ./terminus-ui/navigation/src/
[src-paginator]:          ./terminus-ui/paginator/src/
[src-pipes-date]:         ./terminus-ui/pipes/src/date/date.pipe.ts
[src-pipes-roundNumber]:  ./terminus-ui/pipes/src/round-number/round-number.pipe.ts
[src-pipes-sentenceCase]: ./terminus-ui/pipes/src/sentence-case/sentence-case.pipe.ts
[src-pipes-timeAgo]:      ./terminus-ui/pipes/src/time-ago/time-ago.pipe.ts
[src-pipes-titleCase]:    ./terminus-ui/pipes/src/title-case/title-case.pipe.ts
[src-pipes-truncate]:     ./terminus-ui/pipes/src/truncate/truncate.pipe.ts
[src-pipes]:              ./terminus-ui/pipes/src/
[src-radio-group]:        ./terminus-ui/radio-group/src/
[src-scrollbars]:         ./terminus-ui/scrollbars/src/
[src-search]:             ./terminus-ui/search/src/
[src-select]:             ./terminus-ui/select/src/
[src-sort]:               ./terminus-ui/sort/src/
[src-spacing]:            ./terminus-ui/spacing/src/
[src-table]:              ./terminus-ui/table/src/
[src-tabs]:               ./terminus-ui/tabs/src/
[src-toggle]:             ./terminus-ui/toggle/src/
[src-tooltip]:            ./terminus-ui/tooltip/src/
[src-validators]:         ./terminus-ui/validators/src/

<!-- TS Primary Docs -->
[autocomplete-docs]:    http://uilibrary-docs.terminus.ninja/release/components/TsAutocompleteComponent.html
[autofocus-docs]:       http://uilibrary-docs.terminus.ninja/release/directives/TsAutofocusDirective.html
[button-docs]:          http://uilibrary-docs.terminus.ninja/release/components/TsButtonComponent.html
[card-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsCardComponent.html
[chart-docs]:           http://uilibrary-docs.terminus.ninja/release/components/TsChartComponent.html
[checkbox-docs]:        http://uilibrary-docs.terminus.ninja/release/components/TsCheckboxComponent.html
[chip-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsChipCollectionComponent.html
[confirmation-docs]:    http://uilibrary-docs.terminus.ninja/release/directives/TsConfirmationDirective.html
[copy-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsCopyComponent.html
[csv-entry-docs]:       http://uilibrary-docs.terminus.ninja/release/components/TsCSVEntryComponent.html
[date-range-docs]:      http://uilibrary-docs.terminus.ninja/release/components/TsDateRangeComponent.html
[datepicker-docs]:      http://uilibrary-docs.terminus.ninja/release/components/TsDatepickerComponent.html
[expansion-panel-docs]: http://uilibrary-docs.terminus.ninja/release/components/TsExpansionPanelComponent.html
[file-upload-docs]:     http://uilibrary-docs.terminus.ninja/release/components/TsFileUploadComponent.html
[icon-button-docs]:     http://uilibrary-docs.terminus.ninja/release/components/TsIconButtonComponent.html
[icon-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsIconComponent.html
[input-docs]:           http://uilibrary-docs.terminus.ninja/release/components/TsInputComponent.html
[link-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsLinkComponent.html
[loading-overlay-docs]: http://uilibrary-docs.terminus.ninja/release/components/TsLoadingOverlayComponent.html
[login-form-docs]:      http://uilibrary-docs.terminus.ninja/release/components/TsLoginFormComponent.html
[logo-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsLogoComponent.html
[menu-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsMenuComponent.html
[navigation-docs]:      http://uilibrary-docs.terminus.ninja/release/components/TsNavigationComponent.html
[paginator-docs]:       http://uilibrary-docs.terminus.ninja/release/components/TsPaginatorComponent.html
[pipes-docs]:           http://uilibrary-docs.terminus.ninja/release/modules/TsPipesModule.html
[radio-group-docs]:     http://uilibrary-docs.terminus.ninja/release/components/TsRadioGroupComponent.html
[scrollbars-docs]:      http://uilibrary-docs.terminus.ninja/release/components/TsScrollbarsComponent.html
[search-docs]:          http://uilibrary-docs.terminus.ninja/release/components/TsSearchComponent.html
[select-docs]:          http://uilibrary-docs.terminus.ninja/release/components/TsSelectComponent.html
[sort-docs]:            http://uilibrary-docs.terminus.ninja/release/directives/TsSortDirective.html
[spacing-docs]:         http://uilibrary-docs.terminus.ninja/release/directives/TsVerticalSpacingDirective.html
[table-docs]:           http://uilibrary-docs.terminus.ninja/release/components/TsTableComponent.html
[tabs-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsTabComponent.html
[toggle-docs]:          http://uilibrary-docs.terminus.ninja/release/components/TsToggleComponent.html
[tooltip-docs]:         http://uilibrary-docs.terminus.ninja/release/components/TsTooltipComponent.html
[validators-docs]:      http://uilibrary-docs.terminus.ninja/release/injectables/TsValidatorsService.html

<!-- Versioned Docs & Demos -->
[docs-v8]: http://uilibrary-docs.terminus.ninja/8.x.x/
[docs-v9]: http://uilibrary-docs.terminus.ninja/9.x.x/
[docs-v10]: http://uilibrary-docs.terminus.ninja/10.x.x/
[docs-latest]: http://uilibrary-docs.terminus.ninja/release/
[demo-v8]: https://getterminus.github.io/ui-demos-8.x.x/
[demo-v9]: https://getterminus.github.io/ui-demos-9.x.x/
[demo-v10]: https://getterminus.github.io/ui-demos-10.x.x/
[demo-latest]: https://getterminus.github.io/ui-demos-release/

<!-- TS Usage Docs -->
[autocomplete-usage]:    http://uilibrary-docs.terminus.ninja/release/components/TsAutocompleteComponent.html#readme
[autofocus-usage]:       http://uilibrary-docs.terminus.ninja/release/directives/TsAutofocusDirective.html#readme
[card-usage]:            http://uilibrary-docs.terminus.ninja/release/components/TsCardComponent.html#readme
[chart-usage]:           http://uilibrary-docs.terminus.ninja/release/components/TsChartComponent.html#readme
[checkbox-usage]:        http://uilibrary-docs.terminus.ninja/release/components/TsCheckboxComponent.html#readme
[chip-usage]:            http://uilibrary-docs.terminus.ninja/release/components/TsChipCollectionComponent.html#readme
[confirmation-usage]:    http://uilibrary-docs.terminus.ninja/release/directives/TsConfirmationDirective.html#readme
[csv-entry-usage]:       http://uilibrary-docs.terminus.ninja/release/components/TsCSVEntryComponent.html#readme
[date-range-usage]:      http://uilibrary-docs.terminus.ninja/release/components/TsDateRangeComponent.html#readme
[datepicker-usage]:      http://uilibrary-docs.terminus.ninja/release/components/TsDatepickerComponent.html#readme
[expansion-panel-usage]: http://uilibrary-docs.terminus.ninja/release/components/TsExpansionPanelComponent.html#readme
[file-upload-usage]:     http://uilibrary-docs.terminus.ninja/release/components/TsFileUploadComponent.html#readme
[icon-button-usage]:     http://uilibrary-docs.terminus.ninja/release/components/TsIconButtonComponent.html#readme
[icon-usage]:            http://uilibrary-docs.terminus.ninja/release/components/TsIconComponent.html#readme
[input-usage]:           http://uilibrary-docs.terminus.ninja/release/components/TsInputComponent.html#readme
[link-usage]:            http://uilibrary-docs.terminus.ninja/release/components/TsLinkComponent.html#readme
[logo-usage]:            http://uilibrary-docs.terminus.ninja/release/components/TsLogoComponent.html#readme
[menu-usage]:            http://uilibrary-docs.terminus.ninja/release/components/TsMenuComponent.html#readme
[paginator-usage]:       http://uilibrary-docs.terminus.ninja/release/components/TsPaginatorComponent.html#readme
[navigation-usage]:      http://uilibrary-docs.terminus.ninja/release/components/TsNavigationComponent.html#readme
[radio-group-usage]:     http://uilibrary-docs.terminus.ninja/release/components/TsRadioGroupComponent.html#readme
[scrollbars-usage]:      http://uilibrary-docs.terminus.ninja/release/directives/TsScrollbarsComponent.html#readme
[sort-usage]:            http://uilibrary-docs.terminus.ninja/release/directives/TsSortDirective.html#readme
[table-usage]:           http://uilibrary-docs.terminus.ninja/release/components/TsTableComponent.html#readme
[tabs-usage]:            http://uilibrary-docs.terminus.ninja/release/components/TsTabComponent.html#readme
[validators-usage]:      http://uilibrary-docs.terminus.ninja/release/injectables/TsValidatorsService.html#readme
