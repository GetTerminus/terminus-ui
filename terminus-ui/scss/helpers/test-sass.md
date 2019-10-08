<h1>Testing SCSS</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic Usage](#basic-usage)
- [Yarn](#yarn)
- [Types of tests](#types-of-tests)
  - [Test to Fail](#test-to-fail)
- [Issues, idiosyncracies, etc](#issues-idiosyncracies-etc)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic Usage

We are using a tool called `true` to test our SCSS output. `https://www.oddbird.net/true/docs/`

Think SASS… @include everything (describe, test, etc.)

Each helper file has a .spec.scss file that imports both `true` and the corresponding helper .scss file


## Yarn

If you simply run `yarn run test`, the test doesn’t run, saying there are no changes. Essentially the _watch functionality doesn’t work_.

Workaround (recommended):
1. Select ‘p’ to run by regex of file name
1. Type 'sass' and hit enter
1. Every time you need to run the test again, go to the terminal and hit enter

If you run `yarn run test` and select ‘a’ to run all tests, or if you run `yarn run test:ci:local` it will test the scss and catch errors
and display them in the terminal. However, it does not show up in the istanbul report.


## Types of tests

Two ways to write tests:
For functions, it’s the assert test. For mixins, there’s the assert - output - expect

Example function test:
In this scenario, the $test calls the function, the $expect holds the result, and they are compared.
*Note*
`assert-equal` is for testing equivalency
`assert-unequal` is to test fail cases
`contains` will look for partials
Also available are `assert-true` and `assert-false`

```scss
Define the function, define the expected value, assert they’re equal
   @include test('should return the correct default spacing') {
      $test: spacing(default);
      $expect: 16px;
      @include assert-equal($test, $expect);
   }
```

Example mixin test:
In this scenario the assert has two pieces, an output that includes the mixin, and an expect block of rendered CSS.

```scss
@include test('should return the correct default spacing') {
  @include assert {
    @include output {
      @include make-white();
    }
    @include expect {
      .sample-class {
        color: #ffffff;
      }
    }
  }
}
```

### Test to Fail

It's highly recommended to write your tests to fail, to insure the test is running properly. In other words, it gives a lot of
false-positives. Once you know the test is running correctly, then change the expect value to be the correct one.


## Issues, idiosyncracies, etc

1. Not quite sure how to navigate large blocks of rendered scss (reference `color.spec.scss`s commented-out test. Currently investigating
   how `true` adds classes in the tests so we can better mitigate this critical functionality.
1. It doesn’t care for ticks, so use single quotes in describe and test statements
