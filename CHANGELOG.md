# [14.4.0](https://github.com/GetTerminus/terminus-ui/compare/v14.3.0...v14.4.0) (2019-08-07)


### Features

* **SCSS:** expose helper to style webkit scrollbars ([83593c1](https://github.com/GetTerminus/terminus-ui/commit/83593c1))
* **Table:** scrollbars now always visible if there is scrollable content ([4bbe00e](https://github.com/GetTerminus/terminus-ui/commit/4bbe00e)), closes [#1616](https://github.com/GetTerminus/terminus-ui/issues/1616)

# [14.3.0](https://github.com/GetTerminus/terminus-ui/compare/v14.2.2...v14.3.0) (2019-08-06)


### Features

* **Link:** support for local anchor links ([9360cc1](https://github.com/GetTerminus/terminus-ui/commit/9360cc1)), closes [#1607](https://github.com/GetTerminus/terminus-ui/issues/1607)

## [14.2.2](https://github.com/GetTerminus/terminus-ui/compare/v14.2.1...v14.2.2) (2019-08-06)


### Bug Fixes

* **Table:** row content now vertically centered ([5fff67a](https://github.com/GetTerminus/terminus-ui/commit/5fff67a)), closes [#1579](https://github.com/GetTerminus/terminus-ui/issues/1579)

## [14.2.1](https://github.com/GetTerminus/terminus-ui/compare/v14.2.0...v14.2.1) (2019-08-06)


### Bug Fixes

* **RadioGroup:** corner not spilling outside border radius ([fd6ec43](https://github.com/GetTerminus/terminus-ui/commit/fd6ec43))
* **RadioGroup:** small layout no longer using grid ([5193792](https://github.com/GetTerminus/terminus-ui/commit/5193792))

# [14.2.0](https://github.com/GetTerminus/terminus-ui/compare/v14.1.4...v14.2.0) (2019-08-05)


### Features

* **RadioGroup:** now supports centered content OR left/top aligned content ([7c540f6](https://github.com/GetTerminus/terminus-ui/commit/7c540f6)), closes [#1570](https://github.com/GetTerminus/terminus-ui/issues/1570)

## [14.1.4](https://github.com/GetTerminus/terminus-ui/compare/v14.1.3...v14.1.4) (2019-07-30)


### Bug Fixes

* **Input:** correctly manage autofill on the correct element ([a7e318f](https://github.com/GetTerminus/terminus-ui/commit/a7e318f)), closes [#656](https://github.com/GetTerminus/terminus-ui/issues/656)
* **LoginForm:** set autocomplete for email ([bdc9165](https://github.com/GetTerminus/terminus-ui/commit/bdc9165))

## [14.1.3](https://github.com/GetTerminus/terminus-ui/compare/v14.1.2...v14.1.3) (2019-07-23)


### Bug Fixes

* **Input:** correct alignment between prefix icon and input content ([d2ae252](https://github.com/GetTerminus/terminus-ui/commit/d2ae252)), closes [#1588](https://github.com/GetTerminus/terminus-ui/issues/1588)

## [14.1.2](https://github.com/GetTerminus/terminus-ui/compare/v14.1.1...v14.1.2) (2019-07-23)


### Bug Fixes

* **Link:** controlling theme via input rather than data attr now ([9b2a57e](https://github.com/GetTerminus/terminus-ui/commit/9b2a57e)), closes [#1585](https://github.com/GetTerminus/terminus-ui/issues/1585)

## [14.1.1](https://github.com/GetTerminus/terminus-ui/compare/v14.1.0...v14.1.1) (2019-07-23)


### Bug Fixes

* **CI:** enforce node 11 usage to match dockerfile ([#1605](https://github.com/GetTerminus/terminus-ui/issues/1605)) ([c7ed782](https://github.com/GetTerminus/terminus-ui/commit/c7ed782)), closes [#1581](https://github.com/GetTerminus/terminus-ui/issues/1581)

# [14.1.0](https://github.com/GetTerminus/terminus-ui/compare/v14.0.6...v14.1.0) (2019-07-12)


### Features

* **RadioGroup:** has a hard-coded size for `small` in visual mode ([39c3362](https://github.com/GetTerminus/terminus-ui/commit/39c3362)), closes [#1569](https://github.com/GetTerminus/terminus-ui/issues/1569)
* **RadioGroup:** has a shadow to make interactability more clear ([1258f33](https://github.com/GetTerminus/terminus-ui/commit/1258f33)), closes [#1574](https://github.com/GetTerminus/terminus-ui/issues/1574)

## [14.0.6](https://github.com/GetTerminus/terminus-ui/compare/v14.0.5...v14.0.6) (2019-07-12)


### Bug Fixes

* **Packages:** use correct versions for internal package.json ([f62d54e](https://github.com/GetTerminus/terminus-ui/commit/f62d54e)), closes [#1596](https://github.com/GetTerminus/terminus-ui/issues/1596) [#1597](https://github.com/GetTerminus/terminus-ui/issues/1597) [#1598](https://github.com/GetTerminus/terminus-ui/issues/1598)

## [14.0.5](https://github.com/GetTerminus/terminus-ui/compare/v14.0.4...v14.0.5) (2019-07-10)


### Bug Fixes

* **RadioGroup:** visual radios now dispatch change event ([6702ec7](https://github.com/GetTerminus/terminus-ui/commit/6702ec7)), closes [#1549](https://github.com/GetTerminus/terminus-ui/issues/1549)

## [14.0.4](https://github.com/GetTerminus/terminus-ui/compare/v14.0.3...v14.0.4) (2019-07-03)


### Bug Fixes

* **Input:** passing theme to form field ([8914856](https://github.com/GetTerminus/terminus-ui/commit/8914856)), closes [#1513](https://github.com/GetTerminus/terminus-ui/issues/1513)

## <small>14.0.3 (2019-06-21)</small>

* fix(Packages): now latest UI package is 14.0.2 ([d51e201](https://github.com/GetTerminus/terminus-ui/commit/d51e201))

## <small>14.0.2 (2019-06-21)</small>

* fix(Packages): update internal package.json ([b989ac1](https://github.com/GetTerminus/terminus-ui/commit/b989ac1)), closes [#1563](https://github.com/GetTerminus/terminus-ui/issues/1563)

## <small>14.0.1 (2019-06-21)</small>

* fix(Demo): fix odd layout for select demo ([d217e65](https://github.com/GetTerminus/terminus-ui/commit/d217e65))
* fix(Packages): update internal package dependency versions ([f0f5231](https://github.com/GetTerminus/terminus-ui/commit/f0f5231))

## 14.0.0 (2019-06-21)

* chore: enable TypeScript incremental build ([abdad58](https://github.com/GetTerminus/terminus-ui/commit/abdad58))
* chore(Packages): upgrade all packages ([627f2f2](https://github.com/GetTerminus/terminus-ui/commit/627f2f2)), closes [#1540](https://github.com/GetTerminus/terminus-ui/issues/1540)
* test(ExpansionPanel): fix for trailing Promise error when running all tests ([e218502](https://github.com/GetTerminus/terminus-ui/commit/e218502))
* feat(Dockerfile): update node version for compatability with angular buildkit ([34a9124](https://github.com/GetTerminus/terminus-ui/commit/34a9124))


### BREAKING CHANGE

* Angular v8 is now required. TypeScript 3.4.x is now required.

## <small>13.0.6 (2019-06-21)</small>

* fix(autocomplete): checkbox no longer appears in front of autocomplete options (#1565) ([cb3ca47](https://github.com/GetTerminus/terminus-ui/commit/cb3ca47)), closes [#1565](https://github.com/GetTerminus/terminus-ui/issues/1565)
* chore(Demo): Add missing flexbox module to the icon-button demo ([bdf3d46](https://github.com/GetTerminus/terminus-ui/commit/bdf3d46))
* chore: integrate new stylelint config and fix issues ([f9d7a5e](https://github.com/GetTerminus/terminus-ui/commit/f9d7a5e)), closes [#1526](https://github.com/GetTerminus/terminus-ui/issues/1526)
* chore(ValidationMessages): tests are converted to integration (#1558) ([43025e2](https://github.com/GetTerminus/terminus-ui/commit/43025e2)), closes [#1558](https://github.com/GetTerminus/terminus-ui/issues/1558) [#1297](https://github.com/GetTerminus/terminus-ui/issues/1297)
* chore(Packages): update cs-customizable ([4fdb921](https://github.com/GetTerminus/terminus-ui/commit/4fdb921))
* refactor: fix for linting issues ([730e347](https://github.com/GetTerminus/terminus-ui/commit/730e347))

## <small>13.0.5 (2019-06-18)</small>

* fix(SCSS): docs links to SCSS helpers are working properly ([edd3a33](https://github.com/GetTerminus/terminus-ui/commit/edd3a33)), closes [#1498](https://github.com/GetTerminus/terminus-ui/issues/1498)
* chore(Paginator): converted to integration tests ([3775c31](https://github.com/GetTerminus/terminus-ui/commit/3775c31))
* chore(Demo): remove karma and jasmine ([3c0106c](https://github.com/GetTerminus/terminus-ui/commit/3c0106c)), closes [#1412](https://github.com/GetTerminus/terminus-ui/issues/1412)

## <small>13.0.4 (2019-06-10)</small>

* fix(autocomplete): better docs ([817fdd6](https://github.com/GetTerminus/terminus-ui/commit/817fdd6))
* fix(autocomplete): put back closed and opened event emitter ([7c2a059](https://github.com/GetTerminus/terminus-ui/commit/7c2a059))

## <small>13.0.3 (2019-06-06)</small>

* fix(Demo): correct over-zealous find and replace for 'master' ([ae0ceb3](https://github.com/GetTerminus/terminus-ui/commit/ae0ceb3))

## <small>13.0.2 (2019-06-06)</small>

* fix: update primary README information ([a89aa5d](https://github.com/GetTerminus/terminus-ui/commit/a89aa5d))

## <small>13.0.1 (2019-06-06)</small>

* fix: update all references from master to release ([701626f](https://github.com/GetTerminus/terminus-ui/commit/701626f))
* I don't know why I cant spell ceperatte correctly ([af3c66c](https://github.com/GetTerminus/terminus-ui/commit/af3c66c))
* docs(Select): update migration notes for v13 [skip ci] ([7de7d94](https://github.com/GetTerminus/terminus-ui/commit/7de7d94))

## 13.0.0 (2019-06-05)

* fix(Select): split `TsAutocomplete` and `TsSelect` into separate components ([314df47](https://github.com/GetTerminus/terminus-ui/commit/314df47))


### BREAKING CHANGES & Migration Notes

#### Select

- Dropped support for `formatUIFn`. Select only supports `string` values now. It is up to the consumer to map the string value to a complex value if needed.
- No longer supporting autocomplete features. They have been moved to `TsAutocomplete`.
- `TsSelectChange` value property is no longer generic; it is now `string | string[]`.

#### Option

- Has been renamed from `ts-select-option` to `ts-option` as it is used by multiple components. All functionality remains the same.

```html
<!-- Current -->
<ts-select-option>
  ...
</ts-select-option>

<!-- New -->
<ts-option>
  ...
</ts-option>
```

- The import endpoint has also changed to `@terminus/ui/option`.

```typescript
// Current
@import { TsSelectOption } from '@terminus/ui/select';

// New
@import { TsOption } from '@terminus/ui/option';
```

#### Autocomplete

- This component has been un-deprecated and updated.
- `TsAutocomplete` still has the same basic functions it had when combined with `TsSelect`.
- `TsAutocomplete` leverages the same `<ts-option>` as `TsSelect`:

```html
<!-- Example -->
<ts-autocomplete
  label="Autocomplete Example"
  hint="Begin typing to select.."
  [formControl]="stateCtrl"
  (queryChange)="queryHasChanged($event)"
>
  <ts-option
    [value]="state.name"
    [option]="state"
    *ngFor="let state of filteredStates | async"
  >
    {{ state.name }}
  </ts-option>
</ts-autocomplete>
```

- Autocomplete only supports `string` as it's value type. The selection value will always be `string[]`.
- Dropped support for `chipFormatFn`. For any type other than `string`, it is up to consumer to manage mapping that value to a complex value.


## <small>12.1.7 (2019-06-05)</small>

* fix(Chart): chart now renders after first tick ([d943224](https://github.com/GetTerminus/terminus-ui/commit/d943224)), closes [#1324](https://github.com/GetTerminus/terminus-ui/issues/1324)
* revert(CSVEntry): remove placeholder experiment ([8d90318](https://github.com/GetTerminus/terminus-ui/commit/8d90318)), closes [#1533](https://github.com/GetTerminus/terminus-ui/issues/1533)
* chore(SCSS): created skeleton for testing SCSS (#1521) ([cde99e3](https://github.com/GetTerminus/terminus-ui/commit/cde99e3)), closes [#1521](https://github.com/GetTerminus/terminus-ui/issues/1521) [#952](https://github.com/GetTerminus/terminus-ui/issues/952)
* chore(CI): doctoc now running on smaller set of directories and files (#1523) ([4c972fa](https://github.com/GetTerminus/terminus-ui/commit/4c972fa)), closes [#1523](https://github.com/GetTerminus/terminus-ui/issues/1523) [#1341](https://github.com/GetTerminus/terminus-ui/issues/1341)
* chore(Navigation): documentation elaborated ([47ff01d](https://github.com/GetTerminus/terminus-ui/commit/47ff01d)), closes [#1265](https://github.com/GetTerminus/terminus-ui/issues/1265)
* chore: remove outdated issue templates (#1525) ([f58583a](https://github.com/GetTerminus/terminus-ui/commit/f58583a)), closes [#1525](https://github.com/GetTerminus/terminus-ui/issues/1525)
* chore: update contributors (#1522) ([582c20e](https://github.com/GetTerminus/terminus-ui/commit/582c20e)), closes [#1522](https://github.com/GetTerminus/terminus-ui/issues/1522)
* test(Navigation): add missing test for trackBy ([982ac02](https://github.com/GetTerminus/terminus-ui/commit/982ac02))
* test(Confirmation): add test for missed paths ([def2b6b](https://github.com/GetTerminus/terminus-ui/commit/def2b6b))
* test: explicitly collect coverage from directives ([76cb6d8](https://github.com/GetTerminus/terminus-ui/commit/76cb6d8)), closes [#1480](https://github.com/GetTerminus/terminus-ui/issues/1480)

## <small>12.1.6 (2019-05-20)</small>

* fix(Navigation): clone navigation object to prevent mutation of original ([00fde32](https://github.com/GetTerminus/terminus-ui/commit/00fde32))

## <small>12.1.5 (2019-05-16)</small>

* fix(Input): scope overlay z-index for datepicker ([1fe1a5f](https://github.com/GetTerminus/terminus-ui/commit/1fe1a5f))

## <small>12.1.4 (2019-05-15)</small>

* fix(Chart): expose type coercion functions for charts ([193d482](https://github.com/GetTerminus/terminus-ui/commit/193d482))
* style(Input): remove outdated commented code ([6b7f3b0](https://github.com/GetTerminus/terminus-ui/commit/6b7f3b0))
* style: update code to pass object format lint rule change ([054f322](https://github.com/GetTerminus/terminus-ui/commit/054f322))
* chore: integrate new lint rules and fix all issues (#1488) ([8648c3d](https://github.com/GetTerminus/terminus-ui/commit/8648c3d)), closes [#1488](https://github.com/GetTerminus/terminus-ui/issues/1488)
* chore(Tabs): outputs are now called centering and centered (#1487) ([d85b207](https://github.com/GetTerminus/terminus-ui/commit/d85b207)), closes [#1487](https://github.com/GetTerminus/terminus-ui/issues/1487) [#1478](https://github.com/GetTerminus/terminus-ui/issues/1478)

## <small>12.1.3 (2019-05-01)</small>

* fix(FileUpload): consistent error handling (#1483) ([302c58d](https://github.com/GetTerminus/terminus-ui/commit/302c58d)), closes [#1483](https://github.com/GetTerminus/terminus-ui/issues/1483) [#1357](https://github.com/GetTerminus/terminus-ui/issues/1357)
* chore(Spacing): has integration tests (#1481) ([b08f5e8](https://github.com/GetTerminus/terminus-ui/commit/b08f5e8)), closes [#1481](https://github.com/GetTerminus/terminus-ui/issues/1481) [#1294](https://github.com/GetTerminus/terminus-ui/issues/1294)
* chore: Use code instead of keyCode (#1482) ([c66e9df](https://github.com/GetTerminus/terminus-ui/commit/c66e9df)), closes [#1482](https://github.com/GetTerminus/terminus-ui/issues/1482)
* chore(testing): use ngx-tools createComponent utility (#1479) ([ca6376c](https://github.com/GetTerminus/terminus-ui/commit/ca6376c)), closes [#1479](https://github.com/GetTerminus/terminus-ui/issues/1479)

## <small>12.1.2 (2019-04-25)</small>

* fix(Utilities): sCSS bad inputs prevent a build and error messages are displayed ([dd80490](https://github.com/GetTerminus/terminus-ui/commit/dd80490)), closes [#1456](https://github.com/GetTerminus/terminus-ui/issues/1456)

## <small>12.1.1 (2019-04-16)</small>

* fix(LoadingOverlay): fix for portal already loaded error ([003d795](https://github.com/GetTerminus/terminus-ui/commit/003d795)), closes [#1455](https://github.com/GetTerminus/terminus-ui/issues/1455)
* chore(Docs): Fix missing tabs demo link ([b69b1e2](https://github.com/GetTerminus/terminus-ui/commit/b69b1e2))

## 12.1.0 (2019-04-16)

* feat(Tabs): New tabs component ([637da4b](https://github.com/GetTerminus/terminus-ui/commit/637da4b))
* refactor(tsconfig): remove incorrect parameter ([6c8a3cf](https://github.com/GetTerminus/terminus-ui/commit/6c8a3cf))
* refactor(tsconfig): remove unused legacy tsconfig ([b1cef1f](https://github.com/GetTerminus/terminus-ui/commit/b1cef1f))
* chore(Demo): demo pages are all lazy loading ([02f73e5](https://github.com/GetTerminus/terminus-ui/commit/02f73e5))
* Merge pull request #1453 from GetTerminus/benjamincharity-patch-1 ([b477b71](https://github.com/GetTerminus/terminus-ui/commit/b477b71)), closes [#1453](https://github.com/GetTerminus/terminus-ui/issues/1453)
* Remove unneeded items ([b1c571f](https://github.com/GetTerminus/terminus-ui/commit/b1c571f))

## <small>12.0.1 (2019-04-10)</small>

* fix(Select): fix for missing filter input ([e0ef9e5](https://github.com/GetTerminus/terminus-ui/commit/e0ef9e5)), closes [#1451](https://github.com/GetTerminus/terminus-ui/issues/1451)
* docs: update changelog with v12 migration notes ([aba0835](https://github.com/GetTerminus/terminus-ui/commit/aba0835))

## 12.0.0 (2019-04-09)

* chore(coerceBoolean): * BREAKING CHANGE * deprecate improper uses of coerceBoolean ([1b38004](https://github.com/GetTerminus/terminus-ui/commit/1b38004)), closes [#1233](https://github.com/GetTerminus/terminus-ui/issues/1233)
* chore(Button): *BREAKING CHANGE* clicked is now emitter name ([86ee1e9](https://github.com/GetTerminus/terminus-ui/commit/86ee1e9)), closes [#398](https://github.com/GetTerminus/terminus-ui/issues/398)
* chore(Card): *BREAKING CHANGE* removed \`disabled\` input ([5b3f9e4](https://github.com/GetTerminus/terminus-ui/commit/5b3f9e4)), closes [#1267](https://github.com/GetTerminus/terminus-ui/issues/1267)
* chore(SCSS): *BREAKING CHANGE* z-index name and order updated for clarity ([0b45bca](https://github.com/GetTerminus/terminus-ui/commit/0b45bca)), closes [#1377](https://github.com/GetTerminus/terminus-ui/issues/1377)
* chore(Card): 100% test coverage ([f32aa4b](https://github.com/GetTerminus/terminus-ui/commit/f32aa4b)), closes [#1383](https://github.com/GetTerminus/terminus-ui/issues/1383)
* chore(Accessibility): BREAKING CHANGE - base font weight increased to 400 ([7055c85](https://github.com/GetTerminus/terminus-ui/commit/7055c85))
* chore(community): bug.md and feature.md are now available ([d17feca](https://github.com/GetTerminus/terminus-ui/commit/d17feca)), closes [#1403](https://github.com/GetTerminus/terminus-ui/issues/1403)
* chore(DateRange): null portion of interface is deprecated ([8df86b3](https://github.com/GetTerminus/terminus-ui/commit/8df86b3)), closes [#1434](https://github.com/GetTerminus/terminus-ui/issues/1434)
* chore: Update GitHub's built-in issue templates ([39f6689](https://github.com/GetTerminus/terminus-ui/commit/39f6689))
* chore(template): update ISSUE_TEMPLATE.md and CONTRIBUTING.md ([bf37393](https://github.com/GetTerminus/terminus-ui/commit/bf37393))
* fix(DateRange): *BREAKING CHANGE* change emitter is now called dateRangeChange ([b82befc](https://github.com/GetTerminus/terminus-ui/commit/b82befc)), closes [#1361](https://github.com/GetTerminus/terminus-ui/issues/1361)


### BREAKING CHANGES

1. All: No components coercing boolean `@Input`s
1. Card: `disabled` `@Input` no longer exists
1. DateRange: `change` emitter renamed to `dateRangeChange`
1. DateRange: `TsDateRange` interface no longer supports `null`
1. Typography: Base font weight changed to `400`
1. Button: `clickEvent` event emitter is now named `clicked`
1. Z-index: Naming and order updates


### Migration Notes

#### Boolean coercion

Boolean values can no longer be passed in as strings:

```html
<!-- before -->
<my-component my-input="true"></my-component>

<!-- after -->
<my-component [my-input]="true"></my-component>
```

> ⚠️ NOTE: This effects _all_ components

#### Card

Updated input name to align with existing library conventions:

```html
<!-- before -->
<ts-card [disabled]="true"></ts-card>

<!-- after -->
<ts-card [isDisabled]="true"></ts-card>
```

#### DateRange

The `change` event emitter is duplicated by Angular so it has been renamed:

```html
<!-- before -->
<ts-date-range (change)="myDateRange($event)"></ts-date-range>

<!-- after -->
<ts-date-range (dateRangeChange)="myDateRange($event)"></ts-date-range>
```

The `TsDateRange` interface no longer supports `null`:

```typescript
// before
export interface TsDateRange {
  start: Date | undefined | null;
  end: Date | undefined | null;
}

// after
export interface TsDateRange {
  start: Date | undefined;
  end: Date | undefined;
}
```

#### Base font weight

To solve a few readability issues, our base font weight has been increased to match the Material spec:

```html
<!-- before -->
<link href="https://fonts.googleapis.com/css?family=Roboto:300,500,700" rel="stylesheet">

<!-- after -->
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">
```

#### Button & Icon Button

Updated event emitter name to align with existing library conventions:

```html
<!-- before -->
<ts-button (clickEvent)="myFunction($event)"></ts-button>
<ts-icon-button (clickEvent)="myFunction($event)"></ts-icon-button>

<!-- after -->
<ts-button (clicked)="myFunction($event)"></ts-button>
<ts-icon-button (clicked)="myFunction($event)"></ts-icon-button>
```

#### Z-Index

Naming needed clarification and the order needed to be updated:

Update the following z-index values:

| before             | after                      |
| -------------- | ----------------------- |
| header            | global-header                 |
| overlay            | global-overlay                |
| panel-overlay | attached-panel-overlay |
| menu               | attached-panel-overlay |

> NOTE: `tooltip` will now be at a lower z-index than `global-header`


## <small>11.9.8 (2019-03-28)</small>

* fix(Button): switch disabled to Material input rather than attr ([8eab4de](https://github.com/GetTerminus/terminus-ui/commit/8eab4de))

## <small>11.9.7 (2019-03-28)</small>

* fix(CSVEntry): now encapsulating cell content and escaping quotes ([04cd647](https://github.com/GetTerminus/terminus-ui/commit/04cd647)), closes [#1427](https://github.com/GetTerminus/terminus-ui/issues/1427)

## <small>11.9.6 (2019-03-28)</small>

* fix(Select): space character works in autocomplete ([2fcd6c4](https://github.com/GetTerminus/terminus-ui/commit/2fcd6c4)), closes [#1416](https://github.com/GetTerminus/terminus-ui/issues/1416)
* chore(IconButton): now with integration tests ([1ab6e85](https://github.com/GetTerminus/terminus-ui/commit/1ab6e85)), closes [#1284](https://github.com/GetTerminus/terminus-ui/issues/1284)
* chore(Link): tests converted to integration ([23298fc](https://github.com/GetTerminus/terminus-ui/commit/23298fc)), closes [#1285](https://github.com/GetTerminus/terminus-ui/issues/1285)

## <small>11.9.5 (2019-03-25)</small>

* fix: Fake fix to release last revert ([1a62ade](https://github.com/GetTerminus/terminus-ui/commit/1a62ade))
* revert(Input): remove BrowserAnimationsModule that was added in error ([a0cb699](https://github.com/GetTerminus/terminus-ui/commit/a0cb699)), closes [#1423](https://github.com/GetTerminus/terminus-ui/issues/1423)

## <small>11.9.4 (2019-03-25)</small>

* fix(Select): updated filter label text ([23dafa7](https://github.com/GetTerminus/terminus-ui/commit/23dafa7)), closes [#1352](https://github.com/GetTerminus/terminus-ui/issues/1352)

## <small>11.9.3 (2019-03-18)</small>

* fix(Confirmation): button does not move when overlay opens ([6a35edc](https://github.com/GetTerminus/terminus-ui/commit/6a35edc)), closes [#1406](https://github.com/GetTerminus/terminus-ui/issues/1406)

## <small>11.9.2 (2019-03-18)</small>

* fix(Confirmation): background will not scroll away from overlay ([fc0f7ce](https://github.com/GetTerminus/terminus-ui/commit/fc0f7ce)), closes [#1391](https://github.com/GetTerminus/terminus-ui/issues/1391)
* test(Table): added missing test for incorrect param ([6328a42](https://github.com/GetTerminus/terminus-ui/commit/6328a42)), closes [#1392](https://github.com/GetTerminus/terminus-ui/issues/1392)
* chore(Table): has test for warning ([41673d6](https://github.com/GetTerminus/terminus-ui/commit/41673d6)), closes [#1392](https://github.com/GetTerminus/terminus-ui/issues/1392)
* chore(ValidationMessages): phrasing is aligned ([225eb46](https://github.com/GetTerminus/terminus-ui/commit/225eb46)), closes [#1190](https://github.com/GetTerminus/terminus-ui/issues/1190)
* Revert "chore(Table): has test for warning" ([2478f0f](https://github.com/GetTerminus/terminus-ui/commit/2478f0f))

## <small>11.9.1 (2019-03-15)</small>

* chore(Select): updated hard-coded scss ([756907c](https://github.com/GetTerminus/terminus-ui/commit/756907c)), closes [#1378](https://github.com/GetTerminus/terminus-ui/issues/1378)
* fix(Select): shift+arrow will select multiple ([89651e7](https://github.com/GetTerminus/terminus-ui/commit/89651e7)), closes [#1227](https://github.com/GetTerminus/terminus-ui/issues/1227)

## 11.9.0 (2019-03-15)

* feat(Confirmation): supports positioning ([c11bde0](https://github.com/GetTerminus/terminus-ui/commit/c11bde0)), closes [#830](https://github.com/GetTerminus/terminus-ui/issues/830)
* refactor(AllModules): ordered all imports via tslint ([ea7273c](https://github.com/GetTerminus/terminus-ui/commit/ea7273c)), closes [#1404](https://github.com/GetTerminus/terminus-ui/issues/1404)

## 11.8.0 (2019-03-07)

* feat(ExpansionPanel): Create expansion panel / accordion component ([92e082d](https://github.com/GetTerminus/terminus-ui/commit/92e082d))
* fix(Color): Lighten dark utility color for better distance from utility color ([4f4f4b6](https://github.com/GetTerminus/terminus-ui/commit/4f4f4b6))
* refactor(Select): export the select animations ([0f48e02](https://github.com/GetTerminus/terminus-ui/commit/0f48e02))

## 11.7.0 (2019-03-06)

* chore(Navigation): now using truncation pipe ([58f4f2a](https://github.com/GetTerminus/terminus-ui/commit/58f4f2a)), closes [#1367](https://github.com/GetTerminus/terminus-ui/issues/1367)
* feat(Pipes): truncate pipe is available ([0b68fdd](https://github.com/GetTerminus/terminus-ui/commit/0b68fdd)), closes [#1249](https://github.com/GetTerminus/terminus-ui/issues/1249)
* docs(Changelog): add recent releases to changelog ([6594bd7](https://github.com/GetTerminus/terminus-ui/commit/6594bd7))

## <small>11.6.1 (2019-03-06)</small>

* Merge pull request #1400 from GetTerminus/1073-persistent-changelog ([e8002d3](https://github.com/GetTerminus/terminus-ui/commit/e8002d3)), closes [#1400](https://github.com/GetTerminus/terminus-ui/issues/1400)
* fix(CI): generate persistent changelog file ([b075829](https://github.com/GetTerminus/terminus-ui/commit/b075829))
* revert(Packages): remove yarn ([85f2d66](https://github.com/GetTerminus/terminus-ui/commit/85f2d66))
* chore(CI): add yarn to project dependencies ([ad1712d](https://github.com/GetTerminus/terminus-ui/commit/ad1712d))
* chore(CI): now installing with frozen lockfile ([f7079f4](https://github.com/GetTerminus/terminus-ui/commit/f7079f4))
* refactor(button): integration test for button component (#1394) ([1a34e18](https://github.com/GetTerminus/terminus-ui/commit/1a34e18)), closes [#1394](https://github.com/GetTerminus/terminus-ui/issues/1394) [#1281](https://github.com/GetTerminus/terminus-ui/issues/1281)


## <small>11.6.0 (2019-03-01)</small>

* feat(TestHelpers): moved all core test helpers into the library ([9f63d1f](https://github.com/GetTerminus/terminus-ui/commit/9f63d1f)), closes [#1074](https://github.com/GetTerminus/terminus-ui/issues/1074)


#### Modules that now expose test helpers:

See the module’s usage documentation for a full list of helpers.

- `TsCheckbox`
- `TsDateRange`
- `TsInput`
- `TsSelect`
- `TsRadioGroup`

#### Replaced core helpers:

| New Helper                                 | Replaced functions from core           |
|--------------------------------------------|----------------------------------------|
| `toggleCheckbox`                           | `checkTsCheckbox`, `uncheckTsCheckbox` |
| `sendInput`                                | `setTsInputValue`, `setTsDatePicker`   |
| `selectStandardRadio`, `selectVisualRadio` | `setTsRadioBoxValueByText`             |
| `setDateRangeValues`                       | `setTsDateRangeValue`                  |
| `getAllOptionInstances`                    | `getOptions`                           |
| `openSelect`                               | `openSelector`                         |
| `selectOption`                             | `selectOption`                         |


## <small>11.5.0 (2019-02-28)</small>

* feat(Icon): updated with new svg's for logo ([21896b2](https://github.com/GetTerminus/terminus-ui/commit/21896b2))
* feat(Logo): logo component is now available ([8b47382](https://github.com/GetTerminus/terminus-ui/commit/8b47382))


## <small>11.4.0 (2019-02-27)</small>

* feat(Icon): updated CSV svg ([2857dd5](https://github.com/GetTerminus/terminus-ui/commit/2857dd5)), closes [#1078](https://github.com/GetTerminus/terminus-ui/issues/1078)


## <small>11.3.1 (2019-02-20)</small>

* fix(DatePicker): overwrite material z-index with our map ([bb55e0a](https://github.com/GetTerminus/terminus-ui/commit/bb55e0a))


## <small>11.3.0 (2019-02-19)</small>

* feat(Validation): now using date pipe ([0db8c35](https://github.com/GetTerminus/terminus-ui/commit/0db8c35))


## <small>11.2.1 (2019-02-19)</small>

* fix(FileUpload): protect against cdr being called after it's destroyed ([0990b38](https://github.com/GetTerminus/terminus-ui/commit/0990b38))


## <small>11.2.0 (2019-02-19)</small>

* feat(Validation): add domain validator ([#1366](https://github.com/GetTerminus/terminus-ui/issues/1366)) ([9ade135](https://github.com/GetTerminus/terminus-ui/commit/9ade135))


## <small>11.1.17 (2019-02-19)</small>

* fix(Input): sanitized mask value no longer overwriting UI ([ed2bfd9](https://github.com/GetTerminus/terminus-ui/commit/ed2bfd9)), closes [#1167](https://github.com/GetTerminus/terminus-ui/issues/1167)
* fix(Packages): allow v5 or v6 to be used for ngx-tools ([492432b](https://github.com/GetTerminus/terminus-ui/commit/492432b))


## <small>11.1.16 (2019-02-14)</small>

* fix(Select): filter now fixed at top of panel ([d3d266f](https://github.com/GetTerminus/terminus-ui/commit/d3d266f))
* fix(Select): now correctly opening up/down based on position within viewport ([159568f](https://github.com/GetTerminus/terminus-ui/commit/159568f))
* fix(Select): panel no longer is positioned away from the trigger ([19ef6e0](https://github.com/GetTerminus/terminus-ui/commit/19ef6e0)), closes [#1351](https://github.com/GetTerminus/terminus-ui/issues/1351)
* fix(Select): panel now positioned correctly on the x axis ([69e5f05](https://github.com/GetTerminus/terminus-ui/commit/69e5f05))

---

## <small><11.1.16</small>

For changes prior to `11.1.16` see individual releases: https://github.com/GetTerminus/terminus-ui/releases
