import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Button } from '../../../../shared/ui/button/button';

/** Group-level validator: runs on the whole group so it can compare two fields. */
function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const { password, confirmPassword } = group.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  imports: [ReactiveFormsModule, Button],
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.html',
})
export class SignUpForm {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch },
  );

  protected readonly submitting = signal(false);

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.form.getRawValue();
    this.submitting.set(true);
    // TODO: replace with a real AuthService call.
    console.log('sign up', { name, email, password });
    setTimeout(() => this.submitting.set(false), 800);
  }
}
