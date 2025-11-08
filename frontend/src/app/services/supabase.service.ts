import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/Bolt Database-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private Bolt Database: SupabaseClient;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    // Δημιουργία σύνδεσης με Bolt Database
    this.Bolt Database = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    // Αρχικοποίηση χρήστη
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Έλεγχος αν υπάρχει ήδη συνδεδεμένος χρήστης
    this.supabase.auth.getSession().then(({ data }) => {
      this.currentUserSubject.next(data.session?.user ?? null);
    });
  }

  // Λήψη τρέχοντος χρήστη
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Σύνδεση (Login)
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (data.user) {
      this.currentUserSubject.next(data.user);
    }

    return { data, error };
  }

  // Εγγραφή (Sign Up)
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    return { data, error };
  }

  // Αποσύνδεση (Logout)
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    this.currentUserSubject.next(null);
    return { error };
  }

  // Λήψη Bolt Database client (για queries)
  getClient(): SupabaseClient {
    return this.Bolt Database;
  }
}
