<!--
  Many thanks to the Material team as much of this was lifted from the Material contribution doc:
  https://github.com/angular/material2/blob/master/CONTRIBUTING.md
-->

<h1> Contributing to Terminus/UI</h1>

We are always open questions, ideas and code contributions. As a contributor, here are the
guidelines we would like you to follow.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Code of Conduct](#code-of-conduct)
- [Question or Problem?](#question-or-problem)
- [Want a Feature?](#want-a-feature)
- [Submitting an Issue](#submitting-an-issue)
- [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)
    - [After your pull request is merged](#after-your-pull-request-is-merged)
  - [Coding Rules & Workflow](#coding-rules--workflow)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Code of Conduct

Help us keep Terminus open and inclusive. Please read and follow our [Code of Conduct][coc].


## Question or Problem?

If you find a bug in the source code or a mistake in the documentation, you can help us by
[submitting an issue](#submit-issue) to our [GitHub repository][github]. Including an issue
-reproduction (via our [starter app][starter-app]) is the absolute best way to help the team quickly diagnose the problem.
Screenshots are also helpful.

You can help the team even more and [submit a Pull Request](#submit-pr) with a fix! :pray:


## Want a Feature?

You can *request* a new feature by [submitting an issue](#submit-issue) to our [GitHub
repository][github]. If you would like to *implement* a new feature, please submit an issue with a
proposal for your work first, to be sure that we can use it.  Please consider what kind of change it
is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be
  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
  and help you to craft the change so that it is successfully accepted into the project.
- **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).


## Submitting an Issue

Before you submit an issue, search [existing open/closed issues][issues], as your question may have
already been answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features by not reporting duplicate issues.  Providing the following information will increase the
chances of your issue being dealt with quickly:

- **Overview of the Issue** - if an error is being thrown a non-minified stack trace helps
- **Motivation for or Use Case** - explain what are you trying to do and why the current behavior
    is a bug for you
- **Browsers and Operating System** - is this a problem with all browsers?
- **Reproduce the Error** - Please fork our [starter app][starter-app] to replicate your issue and then share that link.
- **Screenshots** - Due to the visual nature of this library, screenshots can help the team triage
    issues far more quickly than a text description.
- **Related Issues** - has a similar issue been reported before?
- **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be
    causing the problem (line of code or commit)

You can file new issues by providing the above information [here][issues-create].


## Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

- Search [GitHub][pulls] for an open or closed PR that relates to your submission. You don't want to
  duplicate effort.
- Make your changes in a new git branch:
    - `git checkout -b 312-my-fix-branch`
    - Note: You should prefix your branch name with the associated issue number.
- Create your patch, **including appropriate test cases**.
- Follow our coding rules (by verifying all linters pass).
- Run the full test suite and ensure that all tests pass.
- Commit your changes using a descriptive commit message that follows our
  [commit message conventions][commit]. Adherence to these conventions is necessary because release notes are
  automatically generated from these messages. (for this reason it is often advisable to rebase your
  feature branch to ensure clear, concise commits)
- Push your branch to GitHub:
    - `git push my-fork 312-my-fix-branch`
- In GitHub, send a pull request to `terminus-ui:release`.
- If we suggest changes then:
  - Make the required updates.
  - Re-run all test suites to ensure tests are still passing.
  - Re-run all linters.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):
      1. `git rebase release -i`
      1. `git push -f`

That's it! Thank you for your contribution! :pray:


#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the
main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell:
    - `git push my-fork --delete 312-my-fix-branch`
- Check out the `release` branch:
    - `git checkout release -f`
- Delete the local branch:
    - `git branch -D 312-my-fix-branch`
- Update your `release` with the latest upstream version:
    - `git pull --ff upstream release`


### Coding Rules & Workflow

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All public API methods **must be documented**.
- Most coding styles are enforced via linters
- Reference our [development documentation][dev-docs] for more details.



[coc]: https://github.com/GetTerminus/terminus-ui/blob/release/CODE_OF_CONDUCT.md
[github]: https://github.com/GetTerminus/terminus-ui/
[demo]: http://uilibrary-demo.terminus.ninja/release
[issues]: https://github.com/GetTerminus/terminus-ui/issues
[issues-create]: https://github.com/GetTerminus/terminus-ui/issues/new
[pulls]: https://github.com/GetTerminus/terminus-ui/pulls
[dev-docs]: https://github.com/GetTerminus/terminus-ui/blob/release/DEVELOPMENT.md
[commit]: https://github.com/GetTerminus/terminus-ui/blob/release/DEVELOPMENT.md#committing
[starter-app]: https://github.com/GetTerminus/ui-stackblitz-starter
