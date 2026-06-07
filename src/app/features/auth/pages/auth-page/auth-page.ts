import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.html',
})
export class AuthPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLogin = signal(true);

  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  toggleMode() {
    this.isLogin.update((v) => !v);
    this.errorMessage.set(null);
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const action$ = this.isLogin()
      ? this.authService.login(email!, password!)
      : this.authService.register(email!, password!);

    action$.subscribe({
      next: () => {
        // AQUÍ iremos al formulario de solicitud
        this.router.navigate(['/contact-requests']);
      },
      error: (err) => {
        console.error(err);

        this.errorMessage.set(
          this.isLogin() ? 'Correo o contraseña incorrectos.' : 'No se pudo crear la cuenta.',
        );

        this.isLoading.set(false);
      },
    });
  }

  onGoogleLogin() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.router.navigate(['/contact-requests']);
      },
      error: (err) => {
        // Captura si cierran la ventana emergente antes de tiempo o si falla Firebase
        if (err.code !== 'auth/popup-closed-by-user') {
          this.errorMessage.set('Error al conectar con Google. Inténtalo de nuevo.');
        }
        this.isLoading.set(false);
      },
    });
  }
  // Método auxiliar para no duplicar la suscripción del formulario original
  private handleAuthSubscription(action$: any) {
    action$.subscribe({
      next: () => {
        this.router.navigate(['/contact-requests']);
      },
      error: () => {
        this.errorMessage.set(
          this.isLogin()
            ? 'Correo o contraseña incorrectos.'
            : 'No se pudo crear la cuenta. El correo puede estar en uso.',
        );
        this.isLoading.set(false);
      },
    });
  }
}
