import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/**
 * Animations used by the {@link TsDrawerComponent}.
 */
export const tsDrawerAnimations: {
  readonly transformDrawer: AnimationTriggerMetadata;
} = {
  // Animation that expands and collapses a drawer.
  transformDrawer: trigger('transform', [
    state('open, open-instant', style({
      transform: 'none',
      visibility: 'visible',
      width: '{{ expandedSize }}',
    }), { params: { expandedSize: '12.5rem' } }),
    state('void', style({
      'box-shadow': 'none',
      'visibility': 'visible',
      'width': '{{ collapsedSize }}',
    }), { params: { collapsedSize: '3.75rem' } }),
    state('void-shadow', style({
      visibility: 'visible',
      width: '{{ collapsedSize }}',
    }), { params: { collapsedSize: '3.75rem' } }),
    transition('void => open-instant', animate('0ms')),
    transition('void <=> open, open-instant => void, void-shadow <=> open, open-instant => void-shadow',
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
  ]),
};
