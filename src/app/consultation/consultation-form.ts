import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

function requiredText(minimum: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = String(control.value ?? '').trim();
    if (!text) {
      return { required: true };
    }
    if (text.length < minimum) {
      return { minlength: { requiredLength: minimum, actualLength: text.length } };
    }
    return null;
  };
}

function spanishPhone(control: AbstractControl): ValidationErrors | null {
  const text = String(control.value ?? '').trim();
  if (!text) {
    return null;
  }

  const normalized = text.replace(/[\s.-]/g, '');
  return /^(\+34|0034)?[6789]\d{8}$/.test(normalized) ? null : { phone: true };
}

@Component({
  selector: 'app-consultation-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './consultation-form.html',
  host: { class: 'form-card' },
})
export class ConsultationForm {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly submitted = signal(false);
  protected readonly submitting = signal(false);
  protected readonly submittedName = signal('');

  protected readonly clientTypes = [
    { value: 'household', label: 'Particular / Hogar' },
    { value: 'freelance', label: 'Autónomo' },
    { value: 'business', label: 'Empresa' },
    { value: 'community', label: 'Comunidad de vecinos' },
  ];

  protected readonly form = this.formBuilder.group({
    name: ['', [requiredText(2), Validators.maxLength(80)]],
    phone: ['', [Validators.required, spanishPhone, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    clientType: ['household', Validators.required],
    message: ['', Validators.maxLength(800)],
  });

  protected invalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  protected messageFor(field: string): string {
    const errors = this.form.get(field)?.errors;
    if (!errors) {
      return '';
    }
    if (errors['phone']) {
      return 'Usa un teléfono español de 9 dígitos. Vale con el prefijo +34.';
    }
    if (errors['email']) {
      return 'Este email no termina de cuadrar.';
    }
    if (errors['maxlength']) {
      return 'Se ha ido un poco largo. Recórtalo y lo vemos igual.';
    }
    if (errors['minlength']) {
      return 'El nombre se queda corto.';
    }
    if (field === 'clientType') {
      return 'Elige una opción.';
    }
    return 'Rellena este campo.';
  }

  protected submit(): void {
    if (this.submitting()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.focusFirstInvalid();
      return;
    }

    const name = String(this.form.controls.name.value ?? '').trim();
    this.submitting.set(true);

    // A real POST would replace this timeout. For now we confirm on the page.
    window.setTimeout(() => {
      this.submittedName.set(name);
      this.submitting.set(false);
      this.submitted.set(true);
    }, 450);
  }

  protected reset(): void {
    this.form.reset({
      name: '',
      phone: '',
      email: '',
      clientType: 'household',
      message: '',
    });
    this.submitted.set(false);
  }

  private focusFirstInvalid(): void {
    const fields = ['name', 'phone', 'email', 'clientType', 'message'];
    const invalidField = fields.find((field) => this.form.get(field)?.invalid);
    if (!invalidField) {
      return;
    }
    document.getElementById(invalidField)?.focus();
  }
}
