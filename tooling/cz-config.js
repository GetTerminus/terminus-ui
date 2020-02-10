'use strict';

module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     A new feature',
    },
    {
      value: 'fix',
      name: 'fix:      A bug fix',
    },
    {
      value: 'docs',
      name: 'docs:     Documentation only changes',
    },
    {
      value: 'style',
      name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance',
    },
    {
      value: 'test',
      name: 'test:     Adding missing tests',
    },
    {
      value: 'chore',
      name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
    },
    {
      value: 'revert',
      name: 'revert:   Revert to a commit',
    },
    {
      value: 'WIP',
      name: 'WIP:      Work in progress',
    },
  ],

  scopes: [
    { name: 'Autocomplete' },
    { name: 'Autofocus' },
    { name: 'Button' },
    { name: 'Card' },
    { name: 'Chart' },
    { name: 'Checkbox' },
    { name: 'Chip' },
    { name: 'CohortDateRange' },
    { name: 'Confirmation' },
    { name: 'Copy' },
    { name: 'CSVEntry' },
    { name: 'DateRange' },
    { name: 'ExpansionPanel' },
    { name: 'FileUpload' },
    { name: 'FormField' },
    { name: 'Icon' },
    { name: 'IconButton' },
    { name: 'Input' },
    { name: 'Link' },
    { name: 'LoadingOverlay' },
    { name: 'LoginForm' },
    { name: 'Logo' },
    { name: 'Menu' },
    { name: 'Navigation' },
    { name: 'Option' },
    { name: 'Paginator' },
    { name: 'Pipes' },
    { name: 'Popover' },
    { name: 'RadioGroup' },
    { name: 'Scrollbars' },
    { name: 'Search' },
    { name: 'Select' },
    { name: 'SelectionList' },
    { name: 'Services' },
    { name: 'SCSS' },
    { name: 'Sort' },
    { name: 'Spacing' },
    { name: 'Tabs' },
    { name: 'Table' },
    { name: 'Toggle' },
    { name: 'Tooltip' },
    { name: 'Utilities' },
    { name: 'ValidationMessages' },
    { name: 'Validators' },
    // INJECT: Add commitizen scope
    // NB! The above line is required for our yeoman generator and should not be changed.

    { name: 'Demo' },
    { name: 'Packages' },
    { name: 'CI' },
  ],

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'refactor', 'revert', 'chore'],
};
