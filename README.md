# Terminus UI Library


The library of UI components used for Terminus applications.

[![CircleCI][circle-badge]][circle-link]
[![codecov][codecov-badge]][codecov-project]
[![semantic-release][semantic-release-badge]][semantic-release]
[![MIT License][license-image]][license-url]
<br>
[![NPM version][npm-version-image]][npm-url]
[![Github release][gh-release-badge]][gh-releases]
[![Library size][file-size-badge]][raw-distribution-js]
<br>
[![components](https://img.shields.io/badge/Components-31-blue.svg)](#components)
[![pipes](https://img.shields.io/badge/Pipes-5-blue.svg)](#pipes)
[![services](https://img.shields.io/badge/Services-1-blue.svg)](#services)
[![style helpers](https://img.shields.io/badge/StyleHelpers-8-blue.svg)](#style-helpers)
[![validators](https://img.shields.io/badge/Validators-14-blue.svg)](#validators)


---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Library Purpose](#library-purpose)
- [Documentation](#documentation)
- [Available Features](#available-features)
  - [Components](#components)
  - [Pipes](#pipes)
  - [Services](#services)
    - [Available Validators](#available-validators)
  - [Constants](#constants)
  - [Style Helpers](#style-helpers)
- [Installation](#installation)
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


## Available Features

> - :hammer: started
> - :white_check_mark: available
> - :hankey: deprecated

### Components

| Feature                                | Notes                                      | Status             | Demo                            | Docs                         | Usage                       |
|----------------------------------------|--------------------------------------------|:------------------:|---------------------------------|------------------------------|-----------------------------|
| alert                                  |                                            |                    |                                 |                              |                             |
| [autocomplete][src-autocomplete]       | Input with autocomplete                    | :white_check_mark: | [Demo][demo-autocomplete]       | [Docs][autocomplete-docs]    | [Usage][autocomplete-usage] |
| [autofocus][src-autofocus]             | Focus a focusable element on load          | :white_check_mark: | [Demo][demo-autofocus]          | [Docs][autofocus-docs]       | [Usage][autofocus-usage]    |
| badge                                  |                                            |                    |                                 |                              |                             |
| [button][src-button]                   |                                            | :white_check_mark: | [Demo][demo-button]             | [Docs][button-docs]          |                             |
| breadcrumbs                            |                                            |                    |                                 |                              |                             |
| [card][src-card]                       |                                            | :white_check_mark: | [Demo][demo-card]               | [Docs][card-docs]            | [Usage][card-usage]         |
| [chart][src-chart]                     | Charts, graphs etc                         | :white_check_mark: | [Demo][demo-chart]              | [Docs][chart-docs]           | [Usage][chart-usage]        |
| chip                                   |                                            |                    |                                 |                              |                             |
| [checkbox][src-checkbox]               |                                            | :white_check_mark: | [Demo][demo-checkbox]           | [Docs][checkbox-docs]        | [Usage][checkbox-usage]     |
| [confirmation][src-confirmation]       | Add a confirmation step to any `ts-button` | :white_check_mark: | [Demo][demo-confirmation]       | [Docs][confirmation-docs]    | [Usage][confirmation-usage] |
| [copy][src-copy]                       |                                            | :white_check_mark: | [Demo][demo-copy]               | [Docs][copy-docs]            |                             |
| [csv entry][src-csv-entry]             | Manually enter CSV values                  | :white_check_mark: | [Demo][demo-csv-entry]          | [Docs][csv-entry-docs]       | [Usage][csv-entry-usage]    |
| [datepicker][src-datepicker]           | Input with calendar pop-up                 | :white_check_mark: | [Demo][demo-datepicker]         | [Docs][datepicker-docs]      | [Usage][datepicker-usage]   |
| [date-range][src-date-range]           | Dual inputs with calendar pop-ups          | :white_check_mark: | [Demo][demo-date-range]         | [Docs][date-range-docs]      | [Usage][date-range-usage]   |
| dialog                                 |                                            |                    |                                 |                              |                             |
| divider                                |                                            |                    |                                 |                              |                             |
| expansion                              |                                            |                    |                                 |                              |                             |
| [file-upload][src-file-upload]         | File upload with drag and drop             | :white_check_mark: | [Demo][demo-file-upload]        | [Docs][file-upload-docs]     | [Usage][file-upload-usage]  |
| [input mask][src-mask]                 | Custom masks for inputs (phone, zip, etc)  | :white_check_mark: | [Demo][demo-mask]               | [Docs][mask-docs]            | [Usage][mask-usage]         |
| [icon][src-icon]                       | Supported icons: https://material.io/icons | :white_check_mark: | [Demo][demo-icon]               | [Docs][icon-docs]            | [Usage][icon-usage]         |
| [icon-button][src-button]              |                                            | :white_check_mark: | [Demo][demo-icon-button]        | [Docs][icon-button-docs]     | [Usage][icon-button-usage]  |
| [input][src-input]                     |                                            | :white_check_mark: | [Demo][demo-input]              | [Docs][input-docs]           | [Usage][input-usage]        |
| [link][src-link]                       |                                            | :white_check_mark: | [Demo][demo-link]               | [Docs][link-docs]            | [Usage][link-usage]         |
| [loading overlay][src-loading-overlay] | Overlay with loading spinner               | :white_check_mark: | [Demo][demo-loading-overlay]    | [Docs][loading-overlay-docs] |                             |
| [login form][src-login-form]           | Email/password with 'remember me' checkbox | :white_check_mark: | [Demo][demo-log-in-form]        | [Docs][login-form-docs]      |                             |
| [menu][src-menu]                       |                                            | :white_check_mark: | [Demo][demo-menu]               | [Docs][menu-docs]            | [Usage][menu-usage]         |
| [navigation][src-navigation]           | Global navigation menu                     | :white_check_mark: | [Demo][demo-navigation]         | [Docs][navigation-docs]      |                             |
| [paginator][src-paginator]             | Paging controls for collections            | :white_check_mark: | [Demo][demo-paginator]          | [Docs][paginator-docs]       | [Usage][paginator-usage]    |
| [pipes][src-pipes]                     | A collection of pipes for Angular          | :white_check_mark: | [Demo][demo-pipes]              | [Docs][pipes-docs]           |                             |
| progress                               |                                            |                    |                                 |                              |                             |
| progression                            | i.e. Stepper, wizard                       |                    |                                 |                              |                             |
| [radio-group][src-radio-group]         |                                            | :white_check_mark: | [Demo][demo-radio-group]        | [Docs][radio-group-docs]     | [Usage][radio-group-usage]  |
| [scrollbars][src-scrollbars]           | Custom scrollars for both axis'            | :white_check_mark: | [Demo][demo-scrollbars]         | [Docs][scrollbars-docs]      | [Usage][scrollbars-usage]   |
| [search][src-search]                   | input with search capabilities             | :white_check_mark: | [Demo][demo-search]             | [Docs][search-docs]          |                             |
| [select][src-select]                   |                                            | :white_check_mark: | [Demo][demo-select]             | [Docs][select-docs]          |                             |
| [spacing][src-spacing]                 | Helpers for consistent spacing             | :white_check_mark: | [Demo][demo-spacing]            | [Docs][spacing-docs]         |                             |
| [sort][src-sort]                       | Used by `table` for column sorting         | :white_check_mark: | <small>(see table demo)</small> | [Docs][sort-docs]            | [Usage][sort-usage]         |
| [table][src-table]                     |                                            | :white_check_mark: | [Demo][demo-table]              | [Docs][table-docs]           | [Usage][table-usage]        |
| tabs                                   |                                            |                    |                                 |                              |                             |
| [toggle][src-toggle]                   |                                            | :white_check_mark: | [Demo][demo-toggle]             | [Docs][toggle-docs]          |                             |
| [tooltip][src-tooltip]                 |                                            | :white_check_mark: | [Demo][demo-tooltip]            | [Docs][tooltip-docs]         |                             |


### Pipes

[:books: Pipes Documentation][pipes-docs]
<br>
[:circus_tent: Pipes Demo][demo-pipes]

| Pipe                                       | Notes                                      | Status             |
|--------------------------------------------|--------------------------------------------|:------------------:|
| [`tsDate`][src-pipes-date]                 | `short`, `medium`, `extended`, `timestamp` | :white_check_mark: |
| [`tsRoundNumber`][src-pipes-roundNumber]   | Round a number to a specific precision     | :white_check_mark: |
| [`tsSentenceCase`][src-pipes-sentenceCase] | Convert string casing to sentence-case     | :white_check_mark: |
| [`tsTimeAgo`][src-pipes-timeAgo]           | Human-readable time span                   | :white_check_mark: |
| [`tsTitleCase`][src-pipes-titleCase]       | Title Case A String                        | :white_check_mark: |


### Services

| Feature                      | Notes                                               | Status             | Demo                    | Docs                    | Usage                     |
|------------------------------|-----------------------------------------------------|:------------------:|-------------------------|-------------------------|---------------------------|
| [Validators][src-validators] | Expose custom validation methods for reactive forms | :white_check_mark: | [Demo][demo-validators] | [Docs][validators-docs] | [Usage][validators-usage] |


#### Available Validators

| Name                 | Purpose                                                       |
|----------------------|---------------------------------------------------------------|
| `creditCard`         | A credit card number must be valid                            |
| `email`              | An email address must be valid                                |
| `equalToControl`     | A control's value must be equal to another control's value    |
| `greaterThan`        | A number must be greater than another value                   |
| `greaterThanOrEqual` | A number must be greater than or equal to another value       |
| `lessThan`           | A number must be less than another value                      |
| `lessThanOrEqual`    | A number must be less than or equal to another value          |
| `lowercase`          | A value must contain a minimum amount of lowercase characters |
| `minDate`            | A date must be after a minimum date                           |
| `maxDate`            | A date must be before a maximum date                          |
| `password`           | A password must meet certain requirements                     |
| `url`                | A URL must be valid                                           |


### Constants

| Feature      | Notes                                  | Status             | Demo                          | Docs | Usage |
|--------------|----------------------------------------|:------------------:|-------------------------------|------|-------|
| `TS_SPACING` | Expose our spacing sizes in TypeScript | :white_check_mark: | [Demo][demo-spacing-constant] |      |       |


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

Install the library and required dependencies:

```bash
$ yarn add @terminus/ui @terminus/ngx-tools @angular/flex-layout@6.0.0-beta.15 date-fns@2.0.0-alpha.7
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

## Contributing

View the [contribution documentation][contributing] and the [development documentation][dev-workflow].


## Contributors

Thanks goes to these wonderful people ([emoji key][all-contributors-key]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/270193?s=460&v=4" width="100px;"/><br /><sub><b>Benjamin Charity</b></sub>](https://github.com/benjamincharity)<br />[💻](https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity "Code") [📖](https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity "Documentation") [⚠️](https://github.com/GetTerminus/terminus-ui/commits?author=benjamincharity "Tests") [🎨](#design-benjamincharity "Design") [🤔](#ideas-benjamincharity "Ideas, Planning, & Feedback") [👀](#review-benjamincharity "Reviewed Pull Requests") [🔧](#tool-benjamincharity "Tools") | [<img src="https://avatars1.githubusercontent.com/u/31667397?v=4" width="100px;"/><br /><sub><b>coreyterminator</b></sub>](https://github.com/coreyterminator)<br />[💻](https://github.com/GetTerminus/terminus-ui/commits?author=coreyterminator "Code") | [<img src="https://avatars0.githubusercontent.com/u/377552?v=4" width="100px;"/><br /><sub><b>Wendy</b></sub>](https://github.com/atlwendy)<br />[🐛](https://github.com/GetTerminus/terminus-ui/issues?q=author%3Aatlwendy "Bug reports") [💻](https://github.com/GetTerminus/terminus-ui/commits?author=atlwendy "Code") | [<img src="https://avatars0.githubusercontent.com/u/19909708?v=4" width="100px;"/><br /><sub><b>Brian Malinconico</b></sub>](https://github.com/bmalinconico)<br />[🐛](https://github.com/GetTerminus/terminus-ui/issues?q=author%3Abmalinconico "Bug reports") [🤔](#ideas-bmalinconico "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/2921?v=4" width="100px;"/><br /><sub><b>David Harkness</b></sub>](http://rubykata.wordpress.com/)<br />[💻](https://github.com/GetTerminus/terminus-ui/commits?author=david-harkness "Code") | [<img src="https://avatars0.githubusercontent.com/u/14012571?v=4" width="100px;"/><br /><sub><b>kal93</b></sub>](https://github.com/kal93)<br />[🐛](https://github.com/GetTerminus/terminus-ui/issues?q=author%3Akal93 "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/24610542?v=4" width="100px;"/><br /><sub><b>divyameher</b></sub>](https://github.com/divyameher)<br />[🐛](https://github.com/GetTerminus/terminus-ui/issues?q=author%3Adivyameher "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/4729779?v=4" width="100px;"/><br /><sub><b>Devon Peet</b></sub>](https://github.com/dpeet)<br />[🎨](#design-dpeet "Design") [🤔](#ideas-dpeet "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/41060343?v=4" width="100px;"/><br /><sub><b>dean jones</b></sub>](https://github.com/deanterm)<br />[💻](https://github.com/GetTerminus/terminus-ui/commits?author=deanterm "Code") |
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
[circle-link]: https://circleci.com/gh/GetTerminus/terminus-ui/tree/master
[codecov-project]: https://codecov.io/gh/GetTerminus/terminus-ui
[component-demo-screenshot]: https://user-images.githubusercontent.com/270193/28672864-f05b73cc-72ae-11e7-8ead-efd1ee008f43.png
[dev-workflow]: https://github.com/GetTerminus/terminus-ui/blob/master/DEVELOPMENT.md
[contributing]: https://github.com/GetTerminus/terminus-ui/blob/master/CONTRIBUTING.md
[license-url]: https://github.com/GetTerminus/terminus-ui/blob/master/LICENSE
[pkg-json]: https://github.com/GetTerminus/terminus-ui/blob/master/package.json
[docs-url]: https://getterminus.github.io/terminus-ui/
[generator]: https://github.com/GetTerminus/generator-terminus-ui
[npm-url]: https://npmjs.org/package/@terminus/ui
[raw-distribution-js]: https://unpkg.com/@terminus/ui/bundles/terminus-ui.umd.min.js
[ui-github]: https://github.com/GetTerminus/terminus-ui
[ui-npm]: https://www.npmjs.com/package/@terminus/ui
[unpkg-terminus]: https://unpkg.com/@terminus/ui/

<!-- BADGES -->
[circle-badge]: https://circleci.com/gh/GetTerminus/terminus-ui/tree/master.svg?style=shield
[codecov-badge]: https://codecov.io/gh/GetTerminus/terminus-ui/branch/master/graph/badge.svg
[compodoc-badge]: https://rawgit.com/GetTerminus/terminus-ui/master/docs/images/coverage-badge.svg
[file-size-badge]: http://img.badgesize.io/https://unpkg.com/@terminus/ui/bundles/terminus-ui.umd.min.js?compression=gzip
[npm-version-image]: http://img.shields.io/npm/v/@terminus/ui.svg
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[gh-release-badge]: https://img.shields.io/github/release/GetTerminus/terminus-ui.svg
[gh-releases]: https://github.com/GetTerminus/terminus-ui/releases/

<!-- 3RD PARTY -->
[codecov]: https://codecov.io
[codecov_browser]: https://docs.codecov.io/docs/browser-extension
[commitizen-cli]: https://github.com/commitizen/cz-cli
[commitizen]: https://github.com/commitizen
[commitizen_vsc]: https://github.com/KnisterPeter/vscode-commitizen
[compodoc]: https://compodoc.github.io/website/
[compodoc_comments]: https://compodoc.github.io/website/guides/comments.html
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog/blob/v0.5.3/conventions/angular.md
[doctoc]: https://github.com/thlorenz/doctoc
[markdown]: https://daringfireball.net/projects/markdown/syntax
[semantic-release-video]: https://youtu.be/tc2UgG5L7WM
[semantic-release]: https://github.com/semantic-release/semantic-release
[semver]: http://semver.org/
[validate-commit-msg]: https://github.com/kentcdodds/validate-commit-msg
[all-contributors-key]: https://github.com/kentcdodds/all-contributors#emoji-key

<!-- Demos -->
[demo-autocomplete]: https://terminus-ui-demos.stackblitz.io/components/autocomplete
[demo-autofocus]: https://terminus-ui-demos.stackblitz.io/components/autofocus
[demo-button]: https://terminus-ui-demos.stackblitz.io/components/button
[demo-card]: https://terminus-ui-demos.stackblitz.io/components/card
[demo-chart]: https://terminus-ui-demos.stackblitz.io/components/chart
[demo-checkbox]: https://terminus-ui-demos.stackblitz.io/components/checkbox
[demo-confirmation]: https://terminus-ui-demos.stackblitz.io/components/confirmation
[demo-copy]: https://terminus-ui-demos.stackblitz.io/components/copy
[demo-csv-entry]: https://terminus-ui-demos.stackblitz.io/components/csv-entry
[demo-date-range]: https://terminus-ui-demos.stackblitz.io/components/date-range
[demo-datepicker]: https://terminus-ui-demos.stackblitz.io/components/datepicker
[demo-file-upload]: https://terminus-ui-demos.stackblitz.io/components/file-upload
[demo-icon-button]: https://terminus-ui-demos.stackblitz.io/components/icon-button
[demo-icon]: https://terminus-ui-demos.stackblitz.io/components/icon
[demo-input]: https://terminus-ui-demos.stackblitz.io/components/input
[demo-link]: https://terminus-ui-demos.stackblitz.io/components/link
[demo-loading-overlay]: https://terminus-ui-demos.stackblitz.io/components/loading-overlay
[demo-log-in-form]: https://terminus-ui-demos.stackblitz.io/components/log-in-form
[demo-mask]: https://terminus-ui-demos.stackblitz.io/components/mask
[demo-menu]: https://terminus-ui-demos.stackblitz.io/components/menu
[demo-navigation]: https://terminus-ui-demos.stackblitz.io/components/navigation
[demo-paginator]: https://terminus-ui-demos.stackblitz.io/components/paginator
[demo-pipes]: https://terminus-ui-demos.stackblitz.io/components/pipes
[demo-radio-group]: https://terminus-ui-demos.stackblitz.io/components/radio
[demo-scrollbars]: https://terminus-ui-demos.stackblitz.io/components/scrollbars
[demo-search]: https://terminus-ui-demos.stackblitz.io/components/search
[demo-select]: https://terminus-ui-demos.stackblitz.io/components/select
[demo-spacing-constant]: https://terminus-ui-demos.stackblitz.io/components/spacing-constant
[demo-spacing]: https://terminus-ui-demos.stackblitz.io/components/spacing
[demo-table]: https://terminus-ui-demos.stackblitz.io/components/table
[demo-toggle]: https://terminus-ui-demos.stackblitz.io/components/toggle
[demo-tooltip]: https://terminus-ui-demos.stackblitz.io/components/tooltip
[demo-validators]: https://terminus-ui-demos.stackblitz.io/components/validation

<!-- SCSS Docs -->
[breakpoints-docs]: ./terminus-ui/src/scss/docs/breakpoints.md
[color-docs]: ./terminus-ui/src/scss/docs/color.md
[cursors-docs]: ./terminus-ui/src/scss/docs/cursors.md
[layout-docs]: ./terminus-ui/src/scss/docs/layout.md
[shadows-docs]: ./terminus-ui/src/scss/docs/shadows.md
[spacing-docs]: ./terminus-ui/src/scss/docs/spacing.md
[typography-docs]: ./terminus-ui/src/scss/docs/typography.md
[z-index-docs]: ./terminus-ui/src/scss/docs/z-index.md

<!-- Source Directories -->
[src-autocomplete]: ./terminus-ui/src/autocomplete/
[src-autofocus]: ./terminus-ui/src/autofocus/
[src-button]: ./terminus-ui/src/button/
[src-card]: ./terminus-ui/src/card/
[src-chart]: ./terminus-ui/src/chart/
[src-checkbox]: ./terminus-ui/src/checkbox/
[src-confirmation]: ./terminus-ui/src/confirmation/
[src-copy]: ./terminus-ui/src/copy/
[src-csv-entry]: ./terminus-ui/src/csv-entry/
[src-date-range]: ./terminus-ui/src/date-range/
[src-datepicker]: ./terminus-ui/src/datepicker/
[src-file-upload]: ./terminus-ui/src/file-upload/
[src-icon-button]: ./terminus-ui/src/icon-button/
[src-icon]: ./terminus-ui/src/icon/
[src-input]: ./terminus-ui/src/input/
[src-link]: ./terminus-ui/src/link/
[src-loading-overlay]: ./terminus-ui/src/loading-overlay/
[src-login-form]: ./terminus-ui/src/login-form/
[src-mask]: ./terminus-ui/src/mask/
[src-menu]: ./terminus-ui/src/menu/
[src-navigation]: ./terminus-ui/src/navigation/
[src-paginator]: ./terminus-ui/src/paginator/
[src-pipes-date]: ./terminus-ui/src/pipes/date/date.pipe.ts
[src-pipes-roundNumber]: ./terminus-ui/src/pipes/round-number/round-number.pipe.ts
[src-pipes-sentenceCase]: ./terminus-ui/src/pipes/sentence-case/sentence-case.pipe.ts
[src-pipes-timeAgo]: ./terminus-ui/src/pipes/time-ago/time-ago.pipe.ts
[src-pipes-titleCase]: ./terminus-ui/src/pipes/title-case/title-case.pipe.ts
[src-pipes]: ./terminus-ui/src/pipes/
[src-radio-group]: ./terminus-ui/src/radio-group/
[src-scrollbars]: ./terminus-ui/src/scrollbars/
[src-search]: ./terminus-ui/src/search/
[src-select]: ./terminus-ui/src/select/
[src-sort]: ./terminus-ui/src/sort/
[src-spacing]: ./terminus-ui/src/spacing/
[src-table]: ./terminus-ui/src/table/
[src-toggle]: ./terminus-ui/src/toggle/
[src-tooltip]: ./terminus-ui/src/tooltip/
[src-validators]: ./terminus-ui/src/validators/

<!-- TS Primary Docs -->
[autocomplete-docs]: https://getterminus.github.io/terminus-ui/components/TsAutocompleteComponent.html
[autofocus-docs]: https://getterminus.github.io/terminus-ui/directives/TsAutofocusDirective.html
[button-docs]: https://getterminus.github.io/terminus-ui/components/TsButtonComponent.html
[card-docs]: https://getterminus.github.io/terminus-ui/components/TsCardComponent.html
[chart-docs]: https://getterminus.github.io/terminus-ui/components/TsChartComponent.html
[checkbox-docs]: https://getterminus.github.io/terminus-ui/components/TsCheckboxComponent.html
[confirmation-docs]: https://getterminus.github.io/terminus-ui/directives/TsConfirmationDirective.html
[copy-docs]: https://getterminus.github.io/terminus-ui/components/TsCopyComponent.html
[csv-entry-docs]: https://getterminus.github.io/terminus-ui/components/TsCSVEntryComponent.html
[date-range-docs]: https://getterminus.github.io/terminus-ui/components/TsDateRangeComponent.html
[datepicker-docs]: https://getterminus.github.io/terminus-ui/components/TsDatepickerComponent.html
[file-upload-docs]: https://getterminus.github.io/terminus-ui/components/TsFileUploadComponent.html
[icon-button-docs]: https://getterminus.github.io/terminus-ui/components/TsIconButtonComponent.html
[icon-docs]: https://getterminus.github.io/terminus-ui/components/TsIconComponent.html
[input-docs]: https://getterminus.github.io/terminus-ui/components/TsInputComponent.html
[link-docs]: https://getterminus.github.io/terminus-ui/components/TsLinkComponent.html
[loading-overlay-docs]: https://getterminus.github.io/terminus-ui/components/TsLoadingOverlayComponent.html
[login-form-docs]: https://getterminus.github.io/terminus-ui/components/TsLoginFormComponent.html
[mask-docs]: https://getterminus.github.io/terminus-ui/directives/TsMaskDirective.html
[menu-docs]: https://getterminus.github.io/terminus-ui/components/TsMenuComponent.html
[navigation-docs]: https://getterminus.github.io/terminus-ui/components/TsNavigationComponent.html
[paginator-docs]: https://getterminus.github.io/terminus-ui/components/TsPaginatorComponent.html
[pipes-docs]: ./terminus-ui/src/pipes/README.md
[pipes-docs]: https://getterminus.github.io/terminus-ui/modules/TsPipesModule.html
[radio-group-docs]: https://getterminus.github.io/terminus-ui/components/TsRadioGroupComponent.html
[scrollbars-docs]: https://getterminus.github.io/terminus-ui/components/TsScrollbarsComponent.html
[search-docs]: https://getterminus.github.io/terminus-ui/components/TsSearchComponent.html
[select-docs]: https://getterminus.github.io/terminus-ui/components/TsSelectComponent.html
[sort-docs]: https://getterminus.github.io/terminus-ui/directives/TsSortDirective.html
[spacing-docs]: https://getterminus.github.io/terminus-ui/directives/TsVerticalSpacingDirective.html
[table-docs]: https://getterminus.github.io/terminus-ui/components/TsTableComponent.html
[toggle-docs]: https://getterminus.github.io/terminus-ui/components/TsToggleComponent.html
[tooltip-docs]: https://getterminus.github.io/terminus-ui/components/TsTooltipComponent.html
[validators-docs]: https://getterminus.github.io/terminus-ui/injectables/TsValidatorsService.html

<!-- TS Usage Docs -->
[autocomplete-usage]: https://getterminus.github.io/terminus-ui/components/TsAutocompleteComponent.html#readme
[autofocus-usage]: https://getterminus.github.io/terminus-ui/directives/TsAutofocusDirective.html#readme
[card-usage]: https://getterminus.github.io/terminus-ui/components/TsCardComponent.html#readme
[chart-usage]: https://getterminus.github.io/terminus-ui/components/TsChartComponent.html#readme
[checkbox-usage]: https://getterminus.github.io/terminus-ui/components/TsCheckboxComponent.html#readme
[confirmation-usage]: https://getterminus.github.io/terminus-ui/directives/TsConfirmationDirective.html#readme
[csv-entry-usage]: https://getterminus.github.io/terminus-ui/components/TsCSVEntryComponent.html#readme
[date-range-usage]: https://getterminus.github.io/terminus-ui/components/TsDateRangeComponent.html#readme
[datepicker-usage]: https://getterminus.github.io/terminus-ui/components/TsDatepickerComponent.html#readme
[file-upload-usage]: https://getterminus.github.io/terminus-ui/components/TsFileUploadComponent.html#readme
[icon-button-usage]: https://getterminus.github.io/terminus-ui/components/TsIconButtonComponent.html#readme
[icon-usage]: https://getterminus.github.io/terminus-ui/components/TsIconComponent.html#readme
[input-usage]: https://getterminus.github.io/terminus-ui/components/TsInputComponent.html#readme
[link-usage]: https://getterminus.github.io/terminus-ui/components/TsLinkComponent.html#readme
[mask-usage]: https://getterminus.github.io/terminus-ui/directives/TsMaskDirective.html#readme
[menu-usage]: https://getterminus.github.io/terminus-ui/components/TsMenuComponent.html#readme
[paginator-usage]: https://getterminus.github.io/terminus-ui/components/TsPaginatorComponent.html#readme
[radio-group-usage]: https://getterminus.github.io/terminus-ui/components/TsRadioGroupComponent.html#readme
[scrollbars-usage]: https://getterminus.github.io/terminus-ui/directives/TsScrollbarsComponent.html#readme
[sort-usage]: https://getterminus.github.io/terminus-ui/directives/TsSortDirective.html#readme
[table-usage]: https://getterminus.github.io/terminus-ui/components/TsTableComponent.html#readme
[validators-usage]: https://getterminus.github.io/terminus-ui/injectables/TsValidatorsService.html#readme
