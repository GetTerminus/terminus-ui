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
    {name: 'Autocomplete'},
    {name: 'Autofocus'},
    {name: 'Button'},
    {name: 'Card'},
    {name: 'Chart'},
    {name: 'Checkbox'},
    {name: 'Confirmation'},
    {name: 'Copy'},
    {name: 'CSVEntry'},
    {name: 'Datepicker'},
    {name: 'DateRange'},
    {name: 'FileUpload'},
    {name: 'Icon'},
    {name: 'IconButton'},
    {name: 'Input'},
    {name: 'Link'},
    {name: 'LoadingOverlay'},
    {name: 'LoginForm'},
    {name: 'Menu'},
    {name: 'Navigation'},
    {name: 'Paginator'},
    {name: 'Pipes'},
    {name: 'RadioGroup'},
    {name: 'Scrollbars'},
    {name: 'Search'},
    {name: 'Select'},
    {name: 'Services'},
    {name: 'SCSS'},
    {name: 'Sort'},
    {name: 'Spacing'},
    {name: 'Table'},
    {name: 'Toggle'},
    {name: 'Tooltip'},
    {name: 'Utilities'},
    {name: 'ValidationMessages'},
    {name: 'Validators'},
    // INJECT: Add commitizen scope
    // NB! The above line is required for our yeoman generator and should not be changed.

    {name: 'Demo'},
    {name: 'Packages'},
    {name: 'CI'},
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
  allowBreakingChanges: ['feat', 'fix', 'refactor', 'revert', 'chore']

};
