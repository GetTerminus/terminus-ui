import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';


/**
 * Animations used by {@link TsTabCollectionComponent}
 */
export const tsTabsAnimations: {
  readonly translateTab: AnimationTriggerMetadata;
} = {
  // This animation translates a tab along the X axis
  translateTab: trigger('translateTab', [
    // Note: transitions to `none` instead of 0, because some browsers might blur the content.
    state('center, void, left-origin-center, right-origin-center', style({ transform: 'none' })),

    // NOTE:  If the tab is either on the left or right, we additionally add a `min-height` of 1px in order to ensure that the element has a
    // height before its state changes. This is necessary because Chrome does seem to skip the transition in RTL mode if the element does
    // not have a static height and is not rendered. See related issue: https://github.com/angular/material2/issues/9465
    state(
      'left',
      style({
        minHeight: '1px',
        opacity: 0,
        transform: 'translate3d(-50%, 0, 0)',
      }),
    ),
    state(
      'right',
      style({
        opacity: 0,
        minHeight: '1px',
        transform: 'translate3d(50%, 0, 0)',
      }),
    ),

    transition(
      '* => left, * => right, left => center, right => center',
      animate('200ms cubic-bezier(0.35, 0, 0.25, 1)'),
    ),

    transition('void => left-origin-center', [
      style({ transform: 'translate3d(-100%, 0, 0)' }),
      animate('200ms cubic-bezier(0.35, 0, 0.25, 1)'),
    ]),

    transition('void => right-origin-center', [
      style({ transform: 'translate3d(100%, 0, 0)' }),
      animate('200ms cubic-bezier(0.35, 0, 0.25, 1)'),
    ]),
  ]),
};
