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


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Library Component Documentation](#library-component-documentation)
- [Primary Library Features](#primary-library-features)
- [Available Features](#available-features)
  - [Components](#components)
  - [Services](#services)
  - [TypeScript Utilities](#typescript-utilities)
  - [Style Helpers](#style-helpers)
- [Installation](#installation)
- [Global Styles](#global-styles)
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
| datatable        |                                                        |           :hammer: |                              |
| datepicker       |                                                        | :white_check_mark: |      [Demo][demo-datepicker] |
| date-range       |                                                        | :white_check_mark: |      [Demo][demo-date-range] |
| dialog           |                                                        |                :x: |                              |
| divider          |                                                        |                :x: |                              |
| expansion        |                                                        |                :x: |                              |
| file-picker      |                                                        |                :x: |                              |
| input-masking    |                                                        |                :x: |                              |
| input-messages   |         Used by `input` to display validation messages | :white_check_mark: |                              |
| input            |                                                        | :white_check_mark: |           [Demo][demo-input] |
| link             |                                                        | :white_check_mark: |            [Demo][demo-link] |
| loading overlay  |                                                        | :white_check_mark: | [Demo][demo-loading-overlay] |
| login form       |                                                        | :white_check_mark: |     [Demo][demo-log-in-form] |
| menu             |                                                        | :white_check_mark: |            [Demo][demo-menu] |
| navigation       |                                                        | :white_check_mark: |      [Demo][demo-navigation] |
| paginator        |                                                        | :white_check_mark: |      [Demo][demo-paginator] |
| picklist         |                                                        |                :x: |                              |
| progress         |                                                        |                :x: |                              |
| progression      |                                                        |                :x: |                              |
| radio-group      |                                                        | :white_check_mark: |     [Demo][demo-radio-group] |
| search           |                                                        | :white_check_mark: |          [Demo][demo-search] |
| select           |                                                        | :white_check_mark: |          [Demo][demo-select] |
| tabs             |                                                        |                :x: |                              |
| toggle           |                                                        | :white_check_mark: |          [Demo][demo-toggle] |
| tooltip          |                                                        | :white_check_mark: |         [Demo][demo-tooltip] |


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
| assets           |                                                        |           :hammer: |
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
$ yarn add @terminus/ui @angular/forms @angular/animations @angular/material angular2-ladda hammerjs --exact
```


## Global Styles

To use the global styles, import the CSS file into your stylesheets:

```scss
@import '@terminus/ui/terminus-ui.css'
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

[compodoc-badge]: https://rawgit.com/GetTerminus/terminus-ui/master/docs/typescript/images/coverage-badge.svg
[docs-url]: https://getterminus.github.io/terminus-ui/
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/GetTerminus/terminus-ui/blob/master/LICENSE
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
[nucleus]: https://github.com/holidaypirates/nucleus/
[nucleus_annotation]: https://holidaypirates.github.io/nucleus/annotation-reference.html
[doctoc]: https://github.com/thlorenz/doctoc
[codecov]: https://codecov.io
[codecov_browser]: https://docs.codecov.io/docs/browser-extension
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
[dev-wiki]: https://github.com/GetTerminus/terminus-ui/wiki/Development-Workflow

<!-- Demos -->
[demo-button]: https://terminus-ui-demos.stackblitz.io/components/button
[demo-link]: https://terminus-ui-demos.stackblitz.io/components/link
[demo-checkbox]: https://terminus-ui-demos.stackblitz.io/components/checkbox
[demo-copy]: https://terminus-ui-demos.stackblitz.io/components/copy
[demo-datepicker]: https://terminus-ui-demos.stackblitz.io/components/datepicker
[demo-date-range]: https://terminus-ui-demos.stackblitz.io/components/date-range
[demo-input]: https://terminus-ui-demos.stackblitz.io/components/input
[demo-log-in-form]: https://terminus-ui-demos.stackblitz.io/components/log-in-form
[demo-menu]: https://terminus-ui-demos.stackblitz.io/components/menu
[demo-paginator]: https://terminus-ui-demos.stackblitz.io/components/paginator
[demo-select]: https://terminus-ui-demos.stackblitz.io/components/select
[demo-toggle]: https://terminus-ui-demos.stackblitz.io/components/toggle
[demo-navigation]: https://terminus-ui-demos.stackblitz.io/components/navigation
[demo-loading-overlay]: https://terminus-ui-demos.stackblitz.io/components/loading-overlay
[demo-search]: https://terminus-ui-demos.stackblitz.io/components/search
[demo-card]: https://terminus-ui-demos.stackblitz.io/components/card
[demo-tooltip]: https://terminus-ui-demos.stackblitz.io/components/tooltip
[demo-radio-group]: https://terminus-ui-demos.stackblitz.io/components/radio

