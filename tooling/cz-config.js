'use strict';

module.exports = {

  types: [
    {value: 'feat',     name: 'feat:     A new feature'},
    {value: 'fix',      name: 'fix:      A bug fix'},
    {value: 'docs',     name: 'docs:     Documentation only changes'},
    {value: 'style',    name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)'},
    {value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature'},
    {value: 'perf',     name: 'perf:     A code change that improves performance'},
    {value: 'test',     name: 'test:     Adding missing tests'},
    {value: 'chore',    name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation'},
    {value: 'revert',   name: 'revert:   Revert to a commit'},
    {value: 'WIP',      name: 'WIP:      Work in progress'}
  ],

  scopes: [
    {name: 'Button'},
    {name: 'Input'},
    {name: 'ValidationMessages'},
    {name: 'Menu'},
    {name: 'Pagination'},
    {name: 'Search'},
    {name: 'Select'},
    {name: 'Toggle'},
    {name: 'Copy'},
    {name: 'Tooltip'},
    {name: 'Datepicker'},
    {name: 'DateRange'},
    {name: 'Spacing'},
    {name: 'Checkbox'},
    {name: 'LoginForm'},
    {name: 'Link'},
    // INJECT: Add commitizen scope
    // NB! The above line is required for our yeoman generator and should not be changed.

    {name: 'SCSS'},
    {name: 'CI'},
    {name: 'Dependencies'},
    {name: 'Demo'},
    {name: 'Services'},
    {name: 'Utilities'},
  ],

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix']

};
