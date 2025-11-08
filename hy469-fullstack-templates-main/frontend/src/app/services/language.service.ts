import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Τύπος γλώσσας
export type Language = 'el' | 'en';

// Δομή μεταφράσεων
interface Translations {
  [key: string]: {
    el: string;
    en: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject: BehaviorSubject<Language>;
  public currentLanguage: Observable<Language>;

  // Όλες οι μεταφράσεις της εφαρμογής
  private translations: Translations = {
    // Login Page
    'login.title': { el: 'Σύνδεση', en: 'Login' },
    'login.email': { el: 'Email', en: 'Email' },
    'login.password': { el: 'Κωδικός', en: 'Password' },
    'login.submit': { el: 'Είσοδος', en: 'Sign In' },
    'login.noAccount': { el: 'Δεν έχετε λογαριασμό;', en: 'Don\'t have an account?' },
    'login.signUp': { el: 'Εγγραφή', en: 'Sign Up' },
    'login.error': { el: 'Λάθος email ή κωδικός', en: 'Wrong email or password' },
    
    // Common
    'common.loading': { el: 'Φόρτωση...', en: 'Loading...' },
    'common.cancel': { el: 'Ακύρωση', en: 'Cancel' },
    'common.save': { el: 'Αποθήκευση', en: 'Save' },
    'common.delete': { el: 'Διαγραφή', en: 'Delete' },
  };

  constructor() {
    // Έλεγχος αν υπάρχει αποθηκευμένη γλώσσα
    const savedLang = localStorage.getItem('language') as Language;
    const defaultLang: Language = savedLang || 'el';

    this.currentLanguageSubject = new BehaviorSubject<Language>(defaultLang);
    this.currentLanguage = this.currentLanguageSubject.asObservable();
  }

  // Λήψη τρέχουσας γλώσσας
  get currentLanguageValue(): Language {
    return this.currentLanguageSubject.value;
  }

  // Αλλαγή γλώσσας
  setLanguage(lang: Language): void {
    this.currentLanguageSubject.next(lang);
    localStorage.setItem('language', lang);
  }

  // Μετάφραση κειμένου
  translate(key: string): string {
    const translation = this.translations[key];
    
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }

    return translation[this.currentLanguageValue];
  }

  // Εναλλαγή γλώσσας (toggle)
  toggleLanguage(): void {
    const newLang: Language = this.currentLanguageValue === 'el' ? 'en' : 'el';
    this.setLanguage(newLang);
  }
}
