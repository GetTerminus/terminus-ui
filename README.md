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
| login form       |                                                        | :white_check_mark: |      [Demo][demo-login-form] |
| menu             |                                                        | :white_check_mark: |            [Demo][demo-menu] |
| navigation       |                                                        | :white_check_mark: |      [Demo][demo-navigation] |
| pagination       |                                                        | :white_check_mark: |      [Demo][demo-pagination] |
| picklist         |                                                        |                :x: |                              |
| progress         |                                                        |                :x: |                              |
| progression      |                                                        |                :x: |                              |
| radio            |                                                        | :white_check_mark: |                              |
| search           |                                                        | :white_check_mark: |          [Demo][demo-search] |
| select           |                                                        | :white_check_mark: |          [Demo][demo-select] |
| tabs             |                                                        |                :x: |                              |
| toggle           |                                                        | :white_check_mark: |          [Demo][demo-toggle] |
| tooltip          |                                                        | :white_check_mark: |                              |


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
[demo-button]: https://embed.plnkr.co/plunk/W1t5Awrg7LLp4tyM?show=app,preview
[demo-link]: https://embed.plnkr.co/plunk/XmIN87Q0gPx4wwBW?show=app,preview
[demo-checkbox]: https://embed.plnkr.co/plunk/S3nMGAO5ov1qswnl?show=app,preview
[demo-copy]: https://embed.plnkr.co/plunk/Fh0vM71Xq5R06bfA?show=app,preview
[demo-datepicker]: https://embed.plnkr.co/plunk/6PFosHqpA4tuqdre?show=app,preview
[demo-date-range]: https://embed.plnkr.co/plunk/wUSgHiloMlzdKeDN?show=app,preview
[demo-input]: https://embed.plnkr.co/plunk/KGUh1mcdnmX4vMPD?show=app,preview
[demo-login-form]: https://embed.plnkr.co/plunk/rbPXFU8FtCUJv5HR?show=app,preview
[demo-menu]: https://embed.plnkr.co/plunk/ZDPGxMuPoA2CAp35?show=app,preview
[demo-pagination]: https://embed.plnkr.co/plunk/HHnqCzyj0ks05ahD?show=app,preview
[demo-select]: https://embed.plnkr.co/plunk/v2ey7q6Hl2jr2KIw?show=app,preview
[demo-toggle]: https://embed.plnkr.co/plunk/lRsheSRvzEBuXjiP?show=app,preview
[demo-navigation]: https://embed.plnkr.co/plunk/uvwbjzzBcglSa0mw?show=app,preview
[demo-loading-overlay]: https://embed.plnkr.co/plunk/yvuP3SojN6Juvnnb?show=app,preview
[demo-search]: https://embed.plnkr.co/plunk/12I7GkqB1tjeN7Q3?show=app,preview
[demo-card]: https://embed.plnkr.co/plunk/E5syTKxdLMmfBeS3?show=app,preview

