import {
  createFakeEvent,
  createKeyboardEvent,
  createMouseEvent,
  createTouchEvent,
} from './event-objects';


/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * Utility to dispatch any event on a Node.
 *
 * @param node - The Node that should dispatch the event
 * @param event - The event to be dispatched
 * @return The event
 */
export function dispatchEvent(node: Node | Window, event: Event): Event {
  node.dispatchEvent(event);
  return event;
}


/**
 * Shorthand to dispatch a fake event on a specified node.
 *
 * @param node - The Node that should dispatch the fake event
 * @param type - The event type
 * @param canBubble - Define if the event can bubble up the DOM
 * @return The event
 */
export function dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
  return dispatchEvent(node, createFakeEvent(type, canBubble));
}


/**
 * Shorthand to dispatch a keyboard event with a specified key code.
 *
 * @param node - The Node that should dispatch the keyboard event
 * @param type - The event type
 * @param keyCode - The event key code
 * @param target - The target event element
 * @return The keyboard event
 */
export function dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element):
    KeyboardEvent {
  return dispatchEvent(node, createKeyboardEvent(type, keyCode, target)) as KeyboardEvent;
}


/**
 * Shorthand to dispatch a mouse event on the specified coordinates.
 *
 * @param node - The Node that should dispatch the mouse event
 * @param type - The event type
 * @param x - The location on the X axis
 * @param y - The location on the Y axis
 * @param event - The event
 * @return The mouse event
 */
export function dispatchMouseEvent(
  node: Node,
  type: string,
  x = 0,
  y = 0,
  event = createMouseEvent(type, x, y),
): MouseEvent {
  return dispatchEvent(node, event) as MouseEvent;
}


/**
 * Shorthand to dispatch a touch event on the specified coordinates.
 *
 * @param node - The Node that should dispatch the touch event
 * @param type - The event type
 * @param x - The location on the X axis
 * @param y - The location on the Y axis
 * @return The touch event
 */
export function dispatchTouchEvent(node: Node, type: string, x = 0, y = 0) {
  return dispatchEvent(node, createTouchEvent(type, x, y));
}
