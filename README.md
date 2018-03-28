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
[![components](https://img.shields.io/badge/Components-26-blue.svg)](#components)
[![pipes](https://img.shields.io/badge/Pipes-2-blue.svg)](#pipes)
[![services](https://img.shields.io/badge/Services-2-blue.svg)](#services)
[![style helpers](https://img.shields.io/badge/StyleHelpers-8-blue.svg)](#style-helpers)


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
  - [TypeScript Utilities](#typescript-utilities)
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

This library is heavily based on Material Design currently. This provides us a way to rely on very well thought out
usability and accessibility decisions for areas we have not yet addressed internally. While we hold
Material in high regard, we do not believe that all of their decisions are best for the Terminus UI
specifically.


## Documentation

The [available features table](#available-features) contains links for functional and usage documentation
for each feature.


## Available Features

> - :hammer: started
> - :white_check_mark: available
> - :hankey: deprecated

### Components

| Feature         | Notes                                       | Status             | Demo                            | Docs                         | Usage                       |
|-----------------|---------------------------------------------|:------------------:|---------------------------------|------------------------------|-----------------------------|
| alert           |                                             |                    |                                 |                              |                             |
| autocomplete    | Input with autocomplete                     | :white_check_mark: | [Demo][demo-autocomplete]       | [Docs][autocomplete-docs]    | [Usage][autocomplete-usage] |
| autofocus       | Focus a focusable element on load           | :white_check_mark: | [Demo][demo-autofocus]          | [Docs][autofocus-docs]       | [Usage][autofocus-usage]    |
| badge           |                                             |                    |                                 |                              |                             |
| button          |                                             | :white_check_mark: | [Demo][demo-button]             | [Docs][button-docs]          |                             |
| breadcrumbs     |                                             |                    |                                 |                              |                             |
| card            |                                             | :white_check_mark: | [Demo][demo-card]               | [Docs][card-docs]            | [Usage][card-usage]         |
| chip            |                                             |                    |                                 |                              |                             |
| checkbox        |                                             | :white_check_mark: | [Demo][demo-checkbox]           | [Docs][checkbox-docs]        | [Usage][checkbox-usage]     |
| copy            |                                             | :white_check_mark: | [Demo][demo-copy]               | [Docs][copy-docs]            |                             |
| datavis         | Charts, graphs etc                          |                    |                                 |                              |                             |
| datepicker      | Input with calendar pop-up                  | :white_check_mark: | [Demo][demo-datepicker]         | [Docs][datepicker-docs]      | [Usage][datepicker-usage]   |
| date-range      | Dual inputs with calendar pop-ups           | :white_check_mark: | [Demo][demo-date-range]         | [Docs][date-range-docs]      | [Usage][date-range-usage]   |
| dialog          |                                             |                    |                                 |                              |                             |
| divider         |                                             |                    |                                 |                              |                             |
| expansion       |                                             |                    |                                 |                              |                             |
| file-picker     | File upload with drag and drop              |                    |                                 |                              |                             |
| input-masking   |                                             |                    |                                 |                              |                             |
| icon            | Valid icon names: https://material.io/icons | :white_check_mark: | [Demo][demo-icon]               | [Docs][icon-docs]            | [Usage][icon-usage]         |
| icon-button     |                                             | :white_check_mark: | [Demo][demo-icon-button]        | [Docs][icon-button-docs]     | [Usage][icon-button-usage]  |
| input           |                                             | :white_check_mark: | [Demo][demo-input]              | [Docs][input-docs]           | [Usage][input-usage]        |
| link            |                                             | :white_check_mark: | [Demo][demo-link]               | [Docs][link-docs]            | [Usage][link-usage]         |
| loading overlay | Overlay with loading spinner                | :white_check_mark: | [Demo][demo-loading-overlay]    | [Docs][loading-overlay-docs] |                             |
| login form      | Email/password with 'remember me' checkbox  | :white_check_mark: | [Demo][demo-log-in-form]        | [Docs][login-form-docs]      |                             |
| menu            |                                             | :white_check_mark: | [Demo][demo-menu]               | [Docs][menu-docs]            |                             |
| navigation      | Global navigation menu                      | :white_check_mark: | [Demo][demo-navigation]         | [Docs][navigation-docs]      |                             |
| paginator       | Paging controls for collections             | :white_check_mark: | [Demo][demo-paginator]          | [Docs][paginator-docs]       |                             |
| progress        |                                             |                    |                                 |                              |                             |
| progression     | i.e. Stepper, wizard                        |                    |                                 |                              |                             |
| radio-group     |                                             | :white_check_mark: | [Demo][demo-radio-group]        | [Docs][radio-group-docs]     | [Usage][radio-group-usage]  |
| search          | input with search capabilities              | :white_check_mark: | [Demo][demo-search]             | [Docs][search-docs]          |                             |
| select          |                                             | :white_check_mark: | [Demo][demo-select]             | [Docs][select-docs]          |                             |
| spacing         | Helpers for consistent spacing              | :white_check_mark: | [Demo][demo-spacing]            | [Docs][spacing-docs]         |                             |
| sort            | Used by `table` for column sorting          | :white_check_mark: | <small>(see table demo)</small> | [Docs][sort-docs]            | [Usage][sort-usage]         |
| table           |                                             | :white_check_mark: | [Demo][demo-table]              | [Docs][table-docs]           | [Usage][table-usage]        |
| tabs            |                                             |                    |                                 |                              |                             |
| toggle          |                                             | :white_check_mark: | [Demo][demo-toggle]             | [Docs][toggle-docs]          |                             |
| tooltip         |                                             | :white_check_mark: | [Demo][demo-tooltip]            | [Docs][tooltip-docs]         |                             |


### Pipes

| Pipe        | Notes                                      | Status             | Demo               | Docs | Usage |
|-------------|--------------------------------------------|:------------------:|--------------------|------|-------|
| `tsDate`    | `short`, `medium`, `extended`, `timestamp` | :white_check_mark: | [Demo][demo-pipes] |      |       |
| `tsTimeAgo` | Human-readable time span                   | :white_check_mark: | [Demo][demo-pipes] |      |       |


### Services

| Feature    | Notes                                               | Status             | Demo | Docs | Usage |
|------------|-----------------------------------------------------|:------------------:|------|------|-------|
| Spacing    | Expose custom spacing sizes via a service           | :white_check_mark: |      |      |       |
| Validators | Expose custom validation methods for reactive forms | :white_check_mark: |      |      |       |


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
$ yarn add @terminus/ui @terminus/ngx-tools @angular/forms @angular/animations @angular/material hammerjs
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
[breakpoints-docs]: ./terminus-ui/src/scss/docs/breakpoints.md
[color-docs]: ./terminus-ui/src/scss/docs/color.md
[cursors-docs]: ./terminus-ui/src/scss/docs/cursors.md
[layout-docs]: ./terminus-ui/src/scss/docs/layout.md
[shadows-docs]: ./terminus-ui/src/scss/docs/shadows.md
[spacing-docs]: ./terminus-ui/src/scss/docs/spacing.md
[typography-docs]: ./terminus-ui/src/scss/docs/typography.md
[z-index-docs]: ./terminus-ui/src/scss/docs/z-index.md

<!-- TS Primary Docs -->
[autocomplete-docs]: https://getterminus.github.io/terminus-ui/components/TsAutocompleteComponent.html
[autofocus-docs]: https://getterminus.github.io/terminus-ui/directives/TsAutofocusDirective.html
[button-docs]: https://getterminus.github.io/terminus-ui/components/TsButtonComponent.html
[card-docs]: https://getterminus.github.io/terminus-ui/components/TsCardComponent.html
[checkbox-docs]: https://getterminus.github.io/terminus-ui/components/TsCheckboxComponent.html
[copy-docs]: https://getterminus.github.io/terminus-ui/components/TsCopyComponent.html
[date-range-docs]: https://getterminus.github.io/terminus-ui/components/TsDateRangeComponent.html
[datepicker-docs]: https://getterminus.github.io/terminus-ui/components/TsDatepickerComponent.html
[icon-docs]: https://getterminus.github.io/terminus-ui/components/TsIconComponent.html
[icon-button-docs]: https://getterminus.github.io/terminus-ui/components/TsIconButtonComponent.html
[input-docs]: https://getterminus.github.io/terminus-ui/components/TsInputComponent.html
[link-docs]: https://getterminus.github.io/terminus-ui/components/TsLinkComponent.html
[loading-overlay-docs]: https://getterminus.github.io/terminus-ui/components/TsLoadingOverlayComponent.html
[login-form-docs]: https://getterminus.github.io/terminus-ui/components/TsLoginFormComponent.html
[menu-docs]: https://getterminus.github.io/terminus-ui/components/TsMenuComponent.html
[navigation-docs]: https://getterminus.github.io/terminus-ui/components/TsNavigationComponent.html
[paginator-docs]: https://getterminus.github.io/terminus-ui/components/TsPaginatorComponent.html
[radio-group-docs]: https://getterminus.github.io/terminus-ui/components/TsRadioGroupComponent.html
[search-docs]: https://getterminus.github.io/terminus-ui/components/TsSearchComponent.html
[select-docs]: https://getterminus.github.io/terminus-ui/components/TsSelectComponent.html
[sort-docs]: https://getterminus.github.io/terminus-ui/directives/TsSortDirective.html
[spacing-docs]: https://getterminus.github.io/terminus-ui/directives/TsVerticalSpacingDirective.html
[table-docs]: https://getterminus.github.io/terminus-ui/components/TsTableComponent.html
[toggle-docs]: https://getterminus.github.io/terminus-ui/components/TsToggleComponent.html
[tooltip-docs]: https://getterminus.github.io/terminus-ui/components/TsTooltipComponent.html

<!-- TS Usage Docs -->
[autocomplete-usage]: https://getterminus.github.io/terminus-ui/components/TsAutocompleteComponent.html#readme
[autofocus-usage]: https://getterminus.github.io/terminus-ui/directives/TsAutofocusDirective.html#readme
[card-usage]: https://getterminus.github.io/terminus-ui/components/TsCardComponent.html#readme
[checkbox-usage]: https://getterminus.github.io/terminus-ui/components/TsCheckboxComponent.html#readme
[date-range-usage]: https://getterminus.github.io/terminus-ui/components/TsDateRangeComponent.html#readme
[datepicker-usage]: https://getterminus.github.io/terminus-ui/components/TsDatepickerComponent.html#readme
[icon-usage]: https://getterminus.github.io/terminus-ui/components/TsIconComponent.html#readme
[icon-button-usage]: https://getterminus.github.io/terminus-ui/components/TsIconButtonComponent.html#readme
[radio-group-usage]: https://getterminus.github.io/terminus-ui/components/TsRadioGroupComponent.html#readme
[sort-usage]: https://getterminus.github.io/terminus-ui/directives/TsSortDirective.html#readme
[table-usage]: https://getterminus.github.io/terminus-ui/components/TsTableComponent.html#readme
[input-usage]: https://getterminus.github.io/terminus-ui/components/TsInputComponent.html#readme
[link-usage]: https://getterminus.github.io/terminus-ui/components/TsLinkComponent.html#readme
