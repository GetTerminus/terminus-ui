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
