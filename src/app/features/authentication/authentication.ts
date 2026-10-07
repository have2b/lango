import { Component, signal } from '@angular/core';
import { LucideKeyRound } from '@lucide/angular';
import { Button } from '../../shared/ui/button/button';
import { AuthHero } from './components/auth-hero/auth-hero';
import { SignInForm } from './components/sign-in-form/sign-in-form';
import { SignUpForm } from './components/sign-up-form/sign-up-form';

type AuthMode = 'sign-in' | 'sign-up';

@Component({
  imports: [AuthHero, Button, LucideKeyRound, SignInForm, SignUpForm],
  selector: 'app-authentication',
  styles: `
    :host {
      display: block;
      height: 100%;
    }
  `,
  templateUrl: './authentication.html',
})
export class Authentication {
  protected readonly mode = signal<AuthMode>('sign-in');

  protected readonly tabs: { label: string; value: AuthMode }[] = [
    { label: 'Sign in', value: 'sign-in' },
    { label: 'Create account', value: 'sign-up' },
  ];

  protected readonly providers = ['Passkey', 'Google', 'Apple'];
}
