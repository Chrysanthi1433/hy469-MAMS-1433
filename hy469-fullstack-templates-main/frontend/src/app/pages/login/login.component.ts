import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  isSignupMode = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    public languageService: LanguageService,
    private router: Router
  ) {
    // Δημιουργία φόρμας login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Δημιουργία φόρμας signup
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['adult', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Έλεγχος αν ο χρήστης είναι ήδη συνδεδεμένος
    if (this.supabaseService.currentUserValue) {
      this.navigateToHome();
    }
  }

  // Εναλλαγή μεταξύ Login/Signup
  toggleMode(): void {
    this.isSignupMode = !this.isSignupMode;
    this.errorMessage = '';
  }

  // Login
  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    const { data, error } = await this.supabaseService.signIn(email, password);

    this.loading = false;

    if (error) {
      this.errorMessage = this.languageService.translate('login.error');
      return;
    }

    if (data.user) {
      this.navigateToHome();
    }
  }

  // Signup
  async onSignup(): Promise<void> {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password, userType, name } = this.signupForm.value;

    const { data, error } = await this.supabaseService.signUp(email, password, {
      user_type: userType,
      name: name
    });

    this.loading = false;

    if (error) {
      this.errorMessage = error.message;
      return;
    }

    // Αυτόματο login μετά την εγγραφή
    await this.onLogin();
  }

  // Πλοήγηση στο σωστό home ανάλογα με τον τύπο χρήστη
  private async navigateToHome(): Promise<void> {
    const user = this.supabaseService.currentUserValue;
    
    if (!user) {
      return;
    }

    // Λήψη metadata του χρήστη
    const userType = user.user_metadata?.['user_type'] || 'adult';

    // Πλοήγηση ανάλογα με τον τύπο
    switch (userType) {
      case 'child':
        this.router.navigate(['/child/home']);
        break;
      case 'elderly':
        this.router.navigate(['/elderly/home']);
        break;
      default:
        this.router.navigate(['/adult/home']);
    }
  }

  // Εναλλαγή γλώσσας
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  // Helper για μετάφραση
  t(key: string): string {
    return this.languageService.translate(key);
  }
}
