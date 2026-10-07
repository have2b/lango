import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideEye, LucideEyeOff, LucideLogIn } from '@lucide/angular';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  imports: [ReactiveFormsModule, Button, LucideEye, LucideEyeOff, LucideLogIn],
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.html',
})
export class SignInForm {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [true],
  });

  protected readonly showPassword = signal(false);
  protected readonly submitting = signal(false);

  protected submit(): void {
    if (this.form.invalid) {
      // Reveal every error message at once instead of waiting for the user to touch each field.
      this.form.markAllAsTouched();
      return;
    }

    const { email, password, remember } = this.form.getRawValue();
    this.submitting.set(true);
    // TODO: replace with a real AuthService call.
    console.log('sign in', { email, password, remember });
    setTimeout(() => this.submitting.set(false), 800);
  }
}
