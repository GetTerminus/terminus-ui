# Terminus UI Library

The library of UI components used for Terminus applications.

[![CircleCI][circle-badge]][circle-link]
[![codecov][codecov-badge]][codecov-project]
[![DavidDM][david-badge]][david-link]
[![DavidDM Dev][david-dev-badge]][david-link]
<br>
[![semantic-release][semantic-release-badge]][semantic-release]
[![Renovate][renovate-badge]][renovate-link]
[![MIT License][license-image]][license-url]
[![ZenHub][zenhub-image]][zenhub-url]
<br>
[![NPM version][npm-version-image]][npm-url]
[![Github release][gh-release-badge]][gh-releases]
[![Library size][file-size-badge]][raw-distribution-js]
<br>
[![components](https://img.shields.io/badge/Components-39-%2316a085.svg)](#components)
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

The [available features](#available-features) table contains links for functional and usage documentation for each feature.

### Versioned Documentation and Demos

- `latest`
  - [Latest TypeScript Documentation][docs-latest]
  - [Latest Demos][demo-latest]


## Available Features

> - :hammer: started
> - :white_check_mark: available
> - :hankey: deprecated

### Components

|                  Feature                   |                           Notes                           |       Status       |              Demo               |              Docs              |              Usage               |
|--------------------------------------------|-----------------------------------------------------------|:------------------:|---------------------------------|--------------------------------|----------------------------------|
| autocomplete                               | Deprecated. See `selection-list`                          |      :hankey:      | [Demo][demo-autocomplete]       | [Docs][autocomplete-docs]      | [Usage][autocomplete-usage]      |
| [autofocus][src-autofocus]                 | Focus a focusable element on load                         | :white_check_mark: | [Demo][demo-autofocus]          | [Docs][autofocus-docs]         | [Usage][autofocus-usage]         |
| badge                                      | See `chip`                                                | :white_check_mark: | [Demo][demo-chip]               |                                |                                  |
| [button][src-button]                       |                                                           | :white_check_mark: | [Demo][demo-button]             | [Docs][button-docs]            |                                  |
| [card][src-card]                           | Presentational card                                       | :white_check_mark: | [Demo][demo-card]               | [Docs][card-docs]              | [Usage][card-usage]              |
| [chart][src-chart]                         | Charts, graphs etc                                        | :white_check_mark: | [Demo][demo-chart]              | [Docs][chart-docs]             | [Usage][chart-usage]             |
| [chip][src-chip]                           | Chip                                                      | :white_check_mark: | [Demo][demo-chip]               | [Docs][chip-docs]              | [Usage][chip-usage]              |
| [checkbox][src-checkbox]                   |                                                           | :white_check_mark: | [Demo][demo-checkbox]           | [Docs][checkbox-docs]          | [Usage][checkbox-usage]          |
| [cohort-date-range][src-cohort-date-range] | CohortDateRange                                           | :white_check_mark: | [Demo][demo-cohort-date-range]  | [Docs][cohort-date-range-docs] | [Usage][cohort-date-range-usage] |
| [confirmation][src-confirmation]           | Add a confirmation step to any `ts-button`                | :white_check_mark: | [Demo][demo-confirmation]       | [Docs][confirmation-docs]      | [Usage][confirmation-usage]      |
| [copy][src-copy]                           | Component to easily copy string values                    | :white_check_mark: | [Demo][demo-copy]               | [Docs][copy-docs]              | [Usage][copy-usage]              |
| [csv entry][src-csv-entry]                 | Manually enter CSV values                                 | :white_check_mark: | [Demo][demo-csv-entry]          | [Docs][csv-entry-docs]         | [Usage][csv-entry-usage]         |
| [datepicker][src-input]                    | See `TsInputComponent`                                    | :white_check_mark: | [Demo][demo-input]              | [Docs][input-docs]             | [Usage][input-usage]             |
| [date-range][src-date-range]               | Dual inputs with calendar pop-ups                         | :white_check_mark: | [Demo][demo-date-range]         | [Docs][date-range-docs]        | [Usage][date-range-usage]        |
| [drawer][src-drawer]                       | Slide-out drawer panel                                    | :white_check_mark: | [Demo][demo-drawer]             | [Docs][drawer-docs]            | [Usage][drawer-usage]            |
| [expansion-panel][src-expansion-panel]     | Expansion panel with accordion & stepper functionality    | :white_check_mark: | [Demo][demo-expansion-panel]    | [Docs][expansion-panel-docs]   | [Usage][expansion-panel-usage]   |
| [file-upload][src-file-upload]             | File upload with drag and drop                            | :white_check_mark: | [Demo][demo-file-upload]        | [Docs][file-upload-docs]       | [Usage][file-upload-usage]       |
| [icon][src-icon]                           | Supported icons: https://material.io/icons                | :white_check_mark: | [Demo][demo-icon]               | [Docs][icon-docs]              | [Usage][icon-usage]              |
| [icon-button][src-icon-button]             | Icon only button                                          | :white_check_mark: | [Demo][demo-icon-button]        | [Docs][icon-button-docs]       | [Usage][icon-button-usage]       |
| [input][src-input]                         | Input with masking, datepicker, etc                       | :white_check_mark: | [Demo][demo-input]              | [Docs][input-docs]             | [Usage][input-usage]             |
| [link][src-link]                           |                                                           | :white_check_mark: | [Demo][demo-link]               | [Docs][link-docs]              | [Usage][link-usage]              |
| [loading overlay][src-loading-overlay]     | Overlay with loading spinner                              | :white_check_mark: | [Demo][demo-loading-overlay]    | [Docs][loading-overlay-docs]   |                                  |
| [login form][src-login-form]               | Email/password with 'remember me' checkbox                | :white_check_mark: | [Demo][demo-log-in-form]        | [Docs][login-form-docs]        | [Usage][login-form-usage]        |
| [logo][src-logo]                           | Variations of the official logo, certain colors available | :white_check_mark: | [Demo][demo-logo]               | [Docs][logo-docs]              | [Usage][logo-usage]              |
| [menu][src-menu]                           |                                                           | :white_check_mark: | [Demo][demo-menu]               | [Docs][menu-docs]              | [Usage][menu-usage]              |
| [navigation][src-navigation]               | Global navigation menu                                    | :white_check_mark: | [Demo][demo-navigation]         | [Docs][navigation-docs]        | [Usage][navigation-usage]        |
| [paginator][src-paginator]                 | Paging controls for collections                           | :white_check_mark: | [Demo][demo-paginator]          | [Docs][paginator-docs]         | [Usage][paginator-usage]         |
| [pipes][src-pipes]                         | A collection of pipes for Angular                         | :white_check_mark: | [Demo][demo-pipes]              | [Docs][pipes-docs]             |                                  |
| [popover][src-popover]                     | Popover with templates                                    | :white_check_mark: | [Demo][demo-popover]            | [Docs][popover-docs]           | [Usage][popover-usage]           |
| [radio-group][src-radio-group]             |                                                           | :white_check_mark: | [Demo][demo-radio-group]        | [Docs][radio-group-docs]       | [Usage][radio-group-usage]       |
| [scrollbars][src-scrollbars]               | Custom scrollbars for both axis'                          | :white_check_mark: | [Demo][demo-scrollbars]         | [Docs][scrollbars-docs]        | [Usage][scrollbars-usage]        |
| [search][src-search]                       | Input with search capabilities                            | :white_check_mark: | [Demo][demo-search]             | [Docs][search-docs]            |                                  |
| select                                     | Deprecated. See `selection-list`                          |      :hankey:      | [Demo][demo-select]             | [Docs][select-docs]            | [Usage][select-usage]            |
| [selection-list][src-selection-list]       | Classic select dropdown / autocomplete                    | :white_check_mark: | [Demo][demo-selection-list]     | [Docs][selection-list-docs]    | [Usage][selection-list-usage]    |
| [spacing][src-spacing]                     | Helpers for consistent spacing                            | :white_check_mark: | [Demo][demo-spacing]            | [Docs][spacing-docs]           |                                  |
| [sort][src-sort]                           | Used by `table` for column sorting                        | :white_check_mark: | <small>(see table demo)</small> | [Docs][sort-docs]              | [Usage][sort-usage]              |
| [table][src-table]                         |                                                           | :white_check_mark: | [Demo][demo-table]              | [Docs][table-docs]             | [Usage][table-usage]             |
| [tabs][src-tabs]                           | Horizontal tab interface                                  | :white_check_mark: | [Demo][demo-tabs]               | [Docs][tabs-docs]              | [Usage][tabs-usage]              |
| textarea                                   | See `input`                                               | :white_check_mark: | <small>(see input demo)</small> |                                |                                  |
| [toggle][src-toggle]                       | Toggle switch                                             | :white_check_mark: | [Demo][demo-toggle]             | [Docs][toggle-docs]            | [Usage][toggle-usage]            |
| [tooltip][src-tooltip]                     | Simple tooltip                                            | :white_check_mark: | [Demo][demo-tooltip]            | [Docs][tooltip-docs]           |                                  |


### Pipes

[:books: Pipes Documentation][pipes-docs]
<br>
[:circus_tent: Pipes Demo][demo-pipes]

| Pipe                                              | Notes                                       | Status             |
|---------------------------------------------------|---------------------------------------------|:------------------:|
| [`tsAbbreviateNumber`][src-pipes-abbreviateNumber]| Abbreviate a number                         | :white_check_mark: |
| [`tsDate`][src-pipes-date]                        | `short`, `medium`, `extended`, `timestamp`  | :white_check_mark: |
| [`tsRoundNumber`][src-pipes-roundNumber]          | Round a number to a specific precision      | :white_check_mark: |
| [`tsSentenceCase`][src-pipes-sentenceCase]        | Convert string casing to sentence-case      | :white_check_mark: |
| [`tsTimeAgo`][src-pipes-timeAgo]                  | Human-readable time span                    | :white_check_mark: |
| [`tsTitleCase`][src-pipes-titleCase]              | Title Case A String                         | :white_check_mark: |
| [`tsTruncateAt`][src-pipes-truncate]              | Truncate a string, `start`, `middle`, `end` | :white_check_mark: |


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

|      Feature       |                Notes                |       Status       |           Docs            |
|--------------------|-------------------------------------|:------------------:|---------------------------|
| a11y               | Accessibility helpers               | :white_check_mark: |                           |
| animation          |                                     |      :hammer:      |                           |
| breakpoints        | Media query breakpoints             | :white_check_mark: | [Docs][breakpoints-docs]  |
| colors             | Base colors                         | :white_check_mark: | [Docs][color-docs]        |
| cursors            |                                     | :white_check_mark: | [Docs][cursors-docs]      |
| input-placeholder  |                                     | :white_check_mark: |                           |
| layout             |                                     | :white_check_mark: | [Docs][layout-docs]       |
| opposite-direction | Reverse a direction                 | :white_check_mark: |                           |
| shadows            | Shadow functions & mixins           | :white_check_mark: | [Docs][shadows-docs]      |
| spacing            | Control vertical/horizontal spacing | :white_check_mark: | [Docs][spacing-scss-docs] |
| triangle           | Create a triangle using CSS         | :white_check_mark: |                           |
| typography         | Typography styles                   | :white_check_mark: | [Docs][typography-docs]   |
| z-index            | z-index helper                       | :white_check_mark: | [Docs][z-index-docs]      |


## Installation

Install the library and required dependencies:

```bash
# Primary dependencies:
$ yarn add @terminus/ui @terminus/ngx-tools

# Peer dependencies that will need to be installed (needed by UI and tools libraries):
$ yarn add @angular/cdk @angular/material @angular/flex-layout@9.0.0-beta.29 date-fns ngx-perfect-scrollbar \
  @ngrx/effects @ngrx/store popper.js text-mask-core text-mask-addons

# Optional dependencies (needed if using `TsChartComponent`):
$ yarn add @amcharts/amcharts4 @amcharts/amcharts4-geodata
```

> NOTE: `@angular/*` & `@ngrx/*` require `9.0.0` or greater.


### Fonts and Typefaces

Add the following links to install the body fonts and icon fonts used by the library:

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```


### Global Styles

To use the global styles, import the CSS file into your stylesheets:

```scss
@import '~@terminus/ui/terminus-ui.css';
```


## SCSS Helpers

To use the provided SCSS helper methods/variables/mixins, import the helpers file from `@terminus/ui`:

```scss
@import '~@terminus/ui/helpers';
```

## Contributing

View the [contribution documentation][contributing] and the [development documentation][dev-workflow].


## Contributors

Thanks goes to these wonderful people ([emoji key][all-contributors-key]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/benjamincharity"><img src="https://avatars1.githubusercontent.com/u/270193?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Benjamin Charity</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity" title="Code">💻</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity" title="Documentation">📖</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity" title="Tests">⚠️</a> <a href="#design-benjamincharity" title="Design">🎨</a> <a href="#ideas-benjamincharity" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/GetTerminus/terminus-ui/pulls?q=is%3Apr+reviewed-by%3Abenjamincharity" title="Reviewed Pull Requests">👀</a> <a href="#tool-benjamincharity" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/coreyterminator"><img src="https://avatars1.githubusercontent.com/u/31667397?v=4" width="100px;" alt=""/><br /><sub><b>coreyterminator</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/commits?author=coreyterminator" title="Code">💻</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=coreyterminator" title="Documentation">📖</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=coreyterminator" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/atlwendy"><img src="https://avatars0.githubusercontent.com/u/377552?v=4" width="100px;" alt=""/><br /><sub><b>Wendy</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Aatlwendy" title="Bug reports">🐛</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=atlwendy" title="Code">💻</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=atlwendy" title="Documentation">📖</a> <a href="#ideas-atlwendy" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-atlwendy" title="Maintenance">🚧</a> <a href="https://github.com/GetTerminus/terminus-ui/pulls?q=is%3Apr+reviewed-by%3Aatlwendy" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=atlwendy" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/bmalinconico"><img src="https://avatars0.githubusercontent.com/u/19909708?v=4" width="100px;" alt=""/><br /><sub><b>Brian Malinconico</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Abmalinconico" title="Bug reports">🐛</a> <a href="#ideas-bmalinconico" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://rubykata.wordpress.com/"><img src="https://avatars0.githubusercontent.com/u/2921?v=4" width="100px;" alt=""/><br /><sub><b>David Harkness</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/commits?author=david-harkness" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kal93"><img src="https://avatars0.githubusercontent.com/u/14012571?v=4" width="100px;" alt=""/><br /><sub><b>kal93</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Akal93" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/divyameher"><img src="https://avatars0.githubusercontent.com/u/24610542?v=4" width="100px;" alt=""/><br /><sub><b>divyameher</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Adivyameher" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/dpeet"><img src="https://avatars2.githubusercontent.com/u/4729779?v=4" width="100px;" alt=""/><br /><sub><b>Devon Peet</b></sub></a><br /><a href="#design-dpeet" title="Design">🎨</a> <a href="#ideas-dpeet" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/deanterm"><img src="https://avatars2.githubusercontent.com/u/41060343?v=4" width="100px;" alt=""/><br /><sub><b>dean jones</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/commits?author=deanterm" title="Code">💻</a> <a href="#ideas-deanterm" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=deanterm" title="Tests">⚠️</a> <a href="#design-deanterm" title="Design">🎨</a> <a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Adeanterm" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/shani-terminus"><img src="https://avatars3.githubusercontent.com/u/44702601?v=4" width="100px;" alt=""/><br /><sub><b>shani-terminus</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Ashani-terminus" title="Bug reports">🐛</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=shani-terminus" title="Code">💻</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=shani-terminus" title="Documentation">📖</a> <a href="#example-shani-terminus" title="Examples">💡</a> <a href="https://github.com/GetTerminus/terminus-ui/pulls?q=is%3Apr+reviewed-by%3Ashani-terminus" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=shani-terminus" title="Tests">⚠️</a> <a href="#ideas-shani-terminus" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-shani-terminus" title="Maintenance">🚧</a> <a href="#tool-shani-terminus" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/edwin-terminus"><img src="https://avatars1.githubusercontent.com/u/41646583?v=4" width="100px;" alt=""/><br /><sub><b>edwin-terminus</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3Aedwin-terminus" title="Bug reports">🐛</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=edwin-terminus" title="Code">💻</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=edwin-terminus" title="Documentation">📖</a> <a href="#example-edwin-terminus" title="Examples">💡</a> <a href="https://github.com/GetTerminus/terminus-ui/commits?author=edwin-terminus" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/IraErshova"><img src="https://avatars3.githubusercontent.com/u/14790520?v=4" width="100px;" alt=""/><br /><sub><b>Irina Ershova</b></sub></a><br /><a href="https://github.com/GetTerminus/terminus-ui/issues?q=author%3AIraErshova" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
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
[file-size-badge]:        http://img.badgesize.io/https://unpkg.com/@terminus/ui/bundles/terminus-ui.umd.min.js?compression=gzip
[npm-version-image]:      http://img.shields.io/npm/v/@terminus/ui.svg
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[license-image]:          http://img.shields.io/badge/license-MIT-blue.svg
[gh-release-badge]:       https://img.shields.io/github/release/GetTerminus/terminus-ui.svg
[gh-releases]:            https://github.com/GetTerminus/terminus-ui/releases/
[zenhub-image]:           https://dxssrr2j0sq4w.cloudfront.net/3.2.0/img/external/zenhub-badge.png
[zenhub-url]:             https://github.com/GetTerminus/terminus-ui#zenhub
[renovate-badge]:         https://img.shields.io/badge/renovate-enabled-brightgreen.svg
[renovate-link]:          https://renovatebot.com
[david-dev-badge]:        https://david-dm.org/GetTerminus/terminus-ui/dev-status.svg
[david-badge]:            https://david-dm.org/GetTerminus/terminus-ui.svg
[david-link]:             https://david-dm.org/GetTerminus/terminus-ui?view=list

<!-- 3RD PARTY -->
[codecov]:                https://codecov.io
[commitizen-cli]:         https://github.com/commitizen/cz-cli
[commitizen]:             https://github.com/commitizen
[commitizen_vsc]:         https://github.com/KnisterPeter/vscode-commitizen
[doctoc]:                 https://github.com/thlorenz/doctoc
[semantic-release]:       https://github.com/semantic-release/semantic-release
[all-contributors-key]:   https://github.com/kentcdodds/all-contributors#emoji-key

<!-- Demos -->
[demo-autocomplete]:     https://getterminus.github.io/ui-demos-release/components/autocomplete
[demo-autofocus]:        https://getterminus.github.io/ui-demos-release/components/autofocus
[demo-button]:           https://getterminus.github.io/ui-demos-release/components/button
[demo-card]:             https://getterminus.github.io/ui-demos-release/components/card
[demo-chart]:            https://getterminus.github.io/ui-demos-release/components/chart
[demo-chip]:             https://getterminus.github.io/ui-demos-release/components/chip
[demo-checkbox]:         https://getterminus.github.io/ui-demos-release/components/checkbox
[demo-cohort-date-range]:https://getterminus.github.io/ui-demos-release/components/cohort-date-range
[demo-confirmation]:     https://getterminus.github.io/ui-demos-release/components/confirmation
[demo-copy]:             https://getterminus.github.io/ui-demos-release/components/copy
[demo-csv-entry]:        https://getterminus.github.io/ui-demos-release/components/csv-entry
[demo-date-range]:       https://getterminus.github.io/ui-demos-release/components/date-range
[demo-drawer]:           https://getterminus.github.io/ui-demos-release/components/drawer
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
[demo-popover]:          https://getterminus.github.io/ui-demos-release/components/popover
[demo-radio-group]:      https://getterminus.github.io/ui-demos-release/components/radio
[demo-scrollbars]:       https://getterminus.github.io/ui-demos-release/components/scrollbars
[demo-search]:           https://getterminus.github.io/ui-demos-release/components/search
[demo-select]:           https://getterminus.github.io/ui-demos-release/components/select
[demo-selection-list]:   https://getterminus.github.io/ui-demos-release/components/selection-list
[demo-spacing-constant]: https://getterminus.github.io/ui-demos-release/components/spacing-constant
[demo-spacing]:          https://getterminus.github.io/ui-demos-release/components/spacing
[demo-table]:            https://getterminus.github.io/ui-demos-release/components/table
[demo-tabs]:             https://getterminus.github.io/ui-demos-release/components/tabs
[demo-toggle]:           https://getterminus.github.io/ui-demos-release/components/toggle
[demo-tooltip]:          https://getterminus.github.io/ui-demos-release/components/tooltip
[demo-validators]:       https://getterminus.github.io/ui-demos-release/components/validation

<!-- SCSS Docs -->
[breakpoints-docs]:  https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/scss/docs/breakpoints.md
[color-docs]:        https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/scss/docs/color.md
[cursors-docs]:      https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/scss/docs/cursors.md
[layout-docs]:       https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/scss/docs/layout.md
[shadows-docs]:      https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/scss/docs/shadows.md
[spacing-scss-docs]: https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/scss/docs/spacing.md
[typography-docs]:   https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/scss/docs/typography.md
[z-index-docs]:      https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/scss/docs/z-index.md

<!-- Source Directories -->
[src-autofocus]:          https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/autofocus/src/
[src-button]:             https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/button/src/
[src-card]:               https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/card/src/
[src-chart]:              https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/chart/src/
[src-checkbox]:           https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/checkbox/src/
[src-chip]:               https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/chip/src
[src-cohort-date-range]:  https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/cohort-date-range/src/
[src-confirmation]:       https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/confirmation/src/
[src-copy]:               https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/copy/src/
[src-csv-entry]:          https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/csv-entry/src/
[src-date-range]:         https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/date-range/src/
[src-drawer]:             https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/drawer/src/
[src-expansion-panel]:    https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/expansion-panel/src/
[src-file-upload]:        https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/file-upload/src/
[src-icon-button]:        https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/icon-button/src/
[src-icon]:               https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/icon/src/
[src-input]:              https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/input/src/
[src-link]:               https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/link/src/
[src-loading-overlay]:    https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/loading-overlay/src/
[src-login-form]:         https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/login-form/src/
[src-logo]:               https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/logo/src/
[src-menu]:               https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/menu/src/
[src-navigation]:         https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/navigation/src/
[src-paginator]:          https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/paginator/src/
[src-pipes-abbreviateNumber]: https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/pipes/src/abbreviate-number/abbreviate-number.pipe.ts
[src-pipes-date]:         https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/pipes/src/date/date.pipe.ts
[src-pipes-roundNumber]:  https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/pipes/src/round-number/round-number.pipe.ts
[src-pipes-sentenceCase]: https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/pipes/src/sentence-case/sentence-case.pipe.ts
[src-pipes-timeAgo]:      https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/pipes/src/time-ago/time-ago.pipe.ts
[src-pipes-titleCase]:    https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/pipes/src/title-case/title-case.pipe.ts
[src-pipes-truncate]:     https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/pipes/src/truncate/truncate.pipe.ts
[src-pipes]:              https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/pipes/src/
[src-popover]:            https://github.com/Getterminus/terminus-ui/blob/release/projects/library/popover/src/
[src-radio-group]:        https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/radio-group/src/
[src-scrollbars]:         https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/scrollbars/src/
[src-search]:             https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/search/src/
[src-selection-list]:     https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/selection-list/src/
[src-sort]:               https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/sort/src/
[src-spacing]:            https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/spacing/src/
[src-table]:              https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/table/src/
[src-tabs]:               https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/tabs/src/
[src-toggle]:             https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/toggle/src/
[src-tooltip]:            https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/tooltip/src/
[src-validators]:         https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/validators/src/

<!-- TS Primary Docs -->
[autocomplete-docs]:    http://uilibrary-docs.terminus.ninja/release/components/TsAutocompleteComponent.html
[autofocus-docs]:       http://uilibrary-docs.terminus.ninja/release/directives/TsAutofocusDirective.html
[button-docs]:          http://uilibrary-docs.terminus.ninja/release/components/TsButtonComponent.html
[card-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsCardComponent.html
[chart-docs]:           http://uilibrary-docs.terminus.ninja/release/components/TsChartComponent.html
[checkbox-docs]:        http://uilibrary-docs.terminus.ninja/release/components/TsCheckboxComponent.html
[chip-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsChipCollectionComponent.html
[cohort-date-range-docs]:http://uilibrary-docs.terminus.ninja/release/components/TsCohortDateRangeComponent.html
[confirmation-docs]:    http://uilibrary-docs.terminus.ninja/release/directives/TsConfirmationDirective.html
[copy-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsCopyComponent.html
[csv-entry-docs]:       http://uilibrary-docs.terminus.ninja/release/components/TsCSVEntryComponent.html
[date-range-docs]:      http://uilibrary-docs.terminus.ninja/release/components/TsDateRangeComponent.html
[drawer-docs]:          http://uilibrary-docs/terminus.ninja/release/components/TsDrawerComponent.html
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
[popover-docs]:         http://uilibrary-docs.terminus.ninja/release/modules/TsPopoverComponent.html
[radio-group-docs]:     http://uilibrary-docs.terminus.ninja/release/components/TsRadioGroupComponent.html
[scrollbars-docs]:      http://uilibrary-docs.terminus.ninja/release/components/TsScrollbarsComponent.html
[search-docs]:          http://uilibrary-docs.terminus.ninja/release/components/TsSearchComponent.html
[select-docs]:          http://uilibrary-docs.terminus.ninja/release/components/TsSelectComponent.html
[selection-list-docs]:  http://uilibrary-docs.terminus.ninja/release/components/TsSelectionListComponent.html
[sort-docs]:            http://uilibrary-docs.terminus.ninja/release/directives/TsSortDirective.html
[spacing-docs]:         http://uilibrary-docs.terminus.ninja/release/directives/TsVerticalSpacingDirective.html
[table-docs]:           http://uilibrary-docs.terminus.ninja/release/components/TsTableComponent.html
[tabs-docs]:            http://uilibrary-docs.terminus.ninja/release/components/TsTabCollectionComponent.html
[toggle-docs]:          http://uilibrary-docs.terminus.ninja/release/components/TsToggleComponent.html
[tooltip-docs]:         http://uilibrary-docs.terminus.ninja/release/components/TsTooltipComponent.html
[validators-docs]:      http://uilibrary-docs.terminus.ninja/release/injectables/TsValidatorsService.html

<!-- Versioned Docs & Demos -->
[docs-latest]: http://uilibrary-docs.terminus.ninja/release/
[demo-latest]: https://getterminus.github.io/ui-demos-release/

<!-- TS Usage Docs -->
[autocomplete-usage]:      http://uilibrary-docs.terminus.ninja/release/components/TsAutocompleteComponent.html#readme
[autofocus-usage]:         http://uilibrary-docs.terminus.ninja/release/directives/TsAutofocusDirective.html#readme
[card-usage]:              http://uilibrary-docs.terminus.ninja/release/components/TsCardComponent.html#readme
[chart-usage]:             http://uilibrary-docs.terminus.ninja/release/components/TsChartComponent.html#readme
[checkbox-usage]:          http://uilibrary-docs.terminus.ninja/release/components/TsCheckboxComponent.html#readme
[chip-usage]:              http://uilibrary-docs.terminus.ninja/release/components/TsChipCollectionComponent.html#readme
[cohort-date-range-usage]: http://uilibrary-docs.terminus.ninja/release/components/TsCohortDateRangeComponent.html#readme
[confirmation-usage]:      http://uilibrary-docs.terminus.ninja/release/directives/TsConfirmationDirective.html#readme
[copy-usage]:              http://uilibrary-docs.terminus.ninja/release/directives/TsCopyComponent.html#readme
[csv-entry-usage]:         http://uilibrary-docs.terminus.ninja/release/components/TsCSVEntryComponent.html#readme
[date-range-usage]:        http://uilibrary-docs.terminus.ninja/release/components/TsDateRangeComponent.html#readme
[drawer-usage]:            http://uilibrary-docs.terminus.ninja/release/components/TsDrawerComponent.html#readme
[expansion-panel-usage]:   http://uilibrary-docs.terminus.ninja/release/components/TsExpansionPanelComponent.html#readme
[file-upload-usage]:       http://uilibrary-docs.terminus.ninja/release/components/TsFileUploadComponent.html#readme
[icon-button-usage]:       http://uilibrary-docs.terminus.ninja/release/components/TsIconButtonComponent.html#readme
[icon-usage]:              http://uilibrary-docs.terminus.ninja/release/components/TsIconComponent.html#readme
[input-usage]:             http://uilibrary-docs.terminus.ninja/release/components/TsInputComponent.html#readme
[link-usage]:              http://uilibrary-docs.terminus.ninja/release/components/TsLinkComponent.html#readme
[logo-usage]:              http://uilibrary-docs.terminus.ninja/release/components/TsLogoComponent.html#readme
[login-form-usage]:        http://uilibrary-docs.terminus.ninja/release/components/TsLoginFormComponent.html#readme
[menu-usage]:              http://uilibrary-docs.terminus.ninja/release/components/TsMenuComponent.html#readme
[paginator-usage]:         http://uilibrary-docs.terminus.ninja/release/components/TsPaginatorComponent.html#readme
[navigation-usage]:        http://uilibrary-docs.terminus.ninja/release/components/TsNavigationComponent.html#readme
[popover-usage]:           http://uilibrary-docs.terminus.ninja/release/components/TsPopoverComponent.html#readme
[radio-group-usage]:       http://uilibrary-docs.terminus.ninja/release/components/TsRadioGroupComponent.html#readme
[scrollbars-usage]:        http://uilibrary-docs.terminus.ninja/release/directives/TsScrollbarsComponent.html#readme
[select-usage]:            http://uilibrary-docs.terminus.ninja/release/directives/TsSelectComponent.html#readme
[selection-list-usage]:    http://uilibrary-docs.terminus.ninja/release/directives/TsSelectionListComponent.html#readme
[sort-usage]:              http://uilibrary-docs.terminus.ninja/release/directives/TsSortDirective.html#readme
[table-usage]:             http://uilibrary-docs.terminus.ninja/release/components/TsTableComponent.html#readme
[tabs-usage]:              http://uilibrary-docs.terminus.ninja/release/components/TsTabCollectionComponent.html#readme
[toggle-usage]:            http://uilibrary-docs.terminus.ninja/release/components/TsToggleComponent.html#readme
[validators-usage]:        http://uilibrary-docs.terminus.ninja/release/injectables/TsValidatorsService.html#readme
