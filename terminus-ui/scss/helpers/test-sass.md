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

Think SASS… `@include` everything (describe, test, etc.)

Each helper file has a .spec.scss file that imports both `true` and the corresponding helper .scss file

## Yarn

If you simply run `yarn run test`, the test doesn’t run, saying there are no changes. Essentially the _watch functionality doesn’t work_.

Workaround (recommended): 
1. Select ‘p’ to run by regex of file name
1. Type 'sass' and hit enter
1. Every time you need to run the test again, go to the terminal and hit enter

If you run `yarn run test` and select ‘a’ to run all tests, or if you run `yarn run test:ci:local` it will test the scss and catch errors and display them in the terminal. However, it does not show up in the istanbul report.


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
      $test: spacing();
      $expect: 16px;
      @include assert-equal($test, $expect);
   }
```

Example mixin test: 
In this scenario the assert has two pieces, an output that includes the mixin, and an expect block of rendered CSS.

*Note* In some scenarios, it is beneficial to encompass a mixin with a class. True does this automatically with `.test-output`, for simple scenarios, but it can get problematic with multiple class outputs in the same mixin.

```scss
@include test('should return the correct white') {
  @include assert {
    @include output {
      @include make-white();
    }
    @include expect {
      color: #ffffff;
    }
  }
}

@include test('should return the correct white with more classes') {
  @include assert {
    @include output {
      .sample-class {
        @include make-white-paragraph();
      }
    }
    @include expect {
      .sample-class {
        color: #ffffff;
      }

      .sample-class a {
        color: lightblue;
      }
    }
  }
}
```

### Test to Fail

It's highly recommended to write your tests to fail, to insure the test is running properly. In other words, it gives a lot of false-positives. Once you know the test is running correctly, then change the expect value to be the correct one.


## Issues, idiosyncracies, etc

1. Some lint fixes, especially ordering, will cause tests to fail. For this reason, the '.spec.scss' files are omitted from stylelint.

1. There is no way to test a fail scenario. For example, the `theme-color` mixin only accepts 'background-color' and 'color' as parameters. When intentionally testing a fail scenario, e.g. `theme-color(width)` the SCSS fails, and the test spits out an error.

1. Tests for `@media` queries will need a selector nested inside the mixin. Reference breakpoints as an example.

1. True does not translate `@content`. It needs actual content.

1. If a test fails due to a sass error (e.g. `theme-color(foo)`), the test stops where it fails.

1. Does not seem to fully support for pseudo classes.

1. It doesn’t care for ticks, so use single quotes in describe and test statements.

