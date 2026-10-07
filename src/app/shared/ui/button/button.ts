import { Component, computed, input } from '@angular/core';

const variants = {
  primary: 'bg-primary rounded-xl py-3.5 text-white hover:opacity-90',
  outline:
    'text-primary rounded-lg border border-slate-300 bg-white py-2.5 text-sm hover:bg-slate-50',
};

export type ButtonVariant = keyof typeof variants;

/**
 * Styles a native <button> or <a> instead of wrapping one, so type, disabled,
 * focus, aria-* and (click) keep their built-in behaviour.
 *
 * <button appButton type="submit">Sign in</button>
 * <button appButton variant="outline" type="button">Google</button>
 */
@Component({
  selector: 'button[appButton], a[appButton]',
  template: '<ng-content />',
  host: { '[class]': 'classes()' },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');

  protected readonly classes = computed(
    () =>
      `flex items-center cursor-pointer justify-center gap-2 font-semibold transition disabled:opacity-60 ${variants[this.variant()]}`,
  );
}
