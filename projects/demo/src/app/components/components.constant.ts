import { Routes } from '@angular/router';


export const componentsList: Routes = [
  {
    path: 'autocomplete',
    loadChildren: () => import('./autocomplete/autocomplete.module').then(m => m.AutocompleteModule),
    data: { name: 'Autocomplete' },
  },
  {
    path: 'autofocus',
    loadChildren: () => import('./autofocus/autofocus.module').then(m => m.AutofocusModule),
    data: { name: 'Autofocus' },
  },
  {
    path: 'breakpoints',
    loadChildren: () => import('./breakpoints/breakpoints.module').then(m => m.BreakpointsModule),
    data: { name: 'Breakpoints' },
  },
  {
    path: 'button',
    loadChildren: () => import('./button/button.module').then(m => m.ButtonModule),
    data: { name: 'Button' },
  },
  {
    path: 'card',
    loadChildren: () => import('./card/card.module').then(m => m.CardModule),
    data: { name: 'Card' },
  },
  {
    path: 'chart',
    loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule),
    data: { name: 'Chart' },
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./checkbox/checkbox.module').then(m => m.CheckboxModule),
    data: { name: 'Checkbox' },
  },
  {
    path: 'chip',
    loadChildren: () => import('./chip/chip.module').then(m => m.ChipModule),
    data: { name: 'Chip' },
  },
  {
    path: 'cohort-date-range',
    loadChildren: () => import('./cohort-date-range/cohort-date-range.module').then(m => m.CohortDateRangeModule),
    data: { name: 'Cohort Date Range' },
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./confirmation/confirmation.module').then(m => m.ConfirmationModule),
    data: { name: 'Confirmation' },
  },
  {
    path: 'copy',
    loadChildren: () => import('./copy/copy.module').then(m => m.CopyModule),
    data: { name: 'Copy' },
  },
  {
    path: 'csv-entry',
    loadChildren: () => import('./csv-entry/csv-entry.module').then(m => m.CSVEntryModule),
    data: { name: 'CSV Entry' },
  },
  {
    path: 'date-range',
    loadChildren: () => import('./date-range/date-range.module').then(m => m.DateRangeModule),
    data: { name: 'Date Range' },
  },
  {
    path: 'drawer',
    loadChildren: () => import('./drawer/drawer.module').then(m => m.DrawerModule),
    data: { name: 'Drawer' },
  },
  {
    path: 'expansion-panel',
    loadChildren: () => import('./expansion-panel/expansion-panel.module').then(m => m.ExpansionPanelModule),
    data: { name: 'Expansion Panel' },
  },
  {
    path: 'file-upload',
    loadChildren: () => import('./file-upload/file-upload.module').then(m => m.FileUploadModule),
    data: { name: 'File Upload' },
  },
  {
    path: 'form-controls',
    loadChildren: () => import('./form-controls/form-controls.module').then(m => m.FormControlsModule),
    data: { name: 'Form Controls' },
  },
  {
    path: 'icon',
    loadChildren: () => import('./icon/icon.module').then(m => m.IconModule),
    data: { name: 'Icon' },
  },
  {
    path: 'icon-button',
    loadChildren: () => import('./icon-button/icon-button.module').then(m => m.IconButtonModule),
    data: { name: 'Icon Button' },
  },
  {
    path: 'input',
    loadChildren: () => import('./input/input.module').then(m => m.InputModule),
    data: { name: 'Input' },
  },
  {
    path: 'link',
    loadChildren: () => import('./link/link.module').then(m => m.LinkModule),
    data: { name: 'Link' },
  },
  {
    path: 'loading-overlay',
    loadChildren: () => import('./loading-overlay/loading-overlay.module').then(m => m.LoadingOverlayModule),
    data: { name: 'Loading Overlay' },
  },
  {
    path: 'login-form',
    loadChildren: () => import('./login-form/login-form.module').then(m => m.LoginFormModule),
    data: { name: 'Login Form' },
  },
  {
    path: 'logo',
    loadChildren: () => import('./logo/logo.module').then(m => m.LogoModule),
    data: { name: 'Logo' },
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
    data: { name: 'Menu' },
  },
  {
    path: 'navigation',
    loadChildren: () => import('./navigation/navigation.module').then(m => m.NavigationModule),
    data: { name: 'Navigation' },
  },
  {
    path: 'paginator',
    loadChildren: () => import('./paginator/paginator.module').then(m => m.PaginatorModule),
    data: { name: 'Paginator' },
  },
  {
    path: 'pipes',
    loadChildren: () => import('./pipes/pipes.module').then(m => m.PipesModule),
    data: { name: 'Pipes' },
  },
  {
    path: 'popover',
    loadChildren: () => import('./popover/popover.module').then(m => m.PopoverModule),
    data: { name: 'Popover' },
  },
  {
    path: 'radio',
    loadChildren: () => import('./radio/radio.module').then(m => m.RadioModule),
    data: { name: 'Radio' },
  },
  {
    path: 'scrollbars',
    loadChildren: () => import('./scrollbars/scrollbars.module').then(m => m.ScrollbarsModule),
    data: { name: 'Scrollbars' },
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
    data: { name: 'Search' },
  },
  {
    path: 'select',
    loadChildren: () => import('./select/select.module').then(m => m.SelectModule),
    data: { name: 'Select' },
  },
  {
    path: 'selection-list',
    loadChildren: () => import('./selection-list/selection-list.module').then(m => m.SelectionListModule),
    data: { name: 'Selection List' },
  },
  {
    path: 'spacing',
    loadChildren: () => import('./spacing/spacing.module').then(m => m.SpacingModule),
    data: { name: 'Spacing' },
  },
  {
    path: 'spacing-styles',
    loadChildren: () => import('./spacing/spacing-styles.module').then(m => m.SpacingStylesModule),
    data: { name: 'Spacing SCSS' },
  },
  {
    path: 'table',
    loadChildren: () => import('./table/table.module').then(m => m.TableModule),
    data: { name: 'Table' },
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule),
    data: { name: 'Tabs' },
  },
  {
    path: 'toggle',
    loadChildren: () => import('./toggle/toggle.module').then(m => m.ToggleModule),
    data: { name: 'Toggle' },
  },
  {
    path: 'tooltip',
    loadChildren: () => import('./tooltip/tooltip.module').then(m => m.TooltipModule),
    data: { name: 'Tooltip' },
  },
  {
    path: 'typography',
    loadChildren: () => import('./typography/typography.module').then(m => m.TypographyModule),
    data: { name: 'Typography' },
  },
  {
    path: 'validation',
    loadChildren: () => import('./validation/validation.module').then(m => m.ValidationModule),
    data: { name: 'Validation' },
  },
];
