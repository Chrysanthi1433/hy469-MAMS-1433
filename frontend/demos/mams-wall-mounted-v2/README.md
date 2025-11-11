 MAMS – Wall-Mounted – v2

Αυτή είναι η δεύτερη έκδοση (v2) της εφαρμογής  “MAMS – Wall-Mounted Medication Reminder”.
 προσπάθησα να κάνω πιο καθαρή δομή στην εφαρμογή, χρησιμοποιώντας την αρχιτεκτονική Angular με standalone components και routing.

περιλαμβάνει

Αρχική σελίδα (Home) με μήνυμα: «Ώρα για το χάπι της πίεσης»

Εικόνα φαρμάκου με fallback SVG αν δεν φορτώσει

Δύο κουμπιά:

«Το πήρα» → εμφανίζει ✓ και λέει «Μπράβο κυρία Ελένη! Πήρες το χάπι»

«Αργότερα» → λέει «Εντάξει, θα το πάρεις αργότερα» και πηγαίνει στη σελίδα αναβολής

Σελίδα αναβολής (Postpone) όπου διαλέγω μετά από πόσα δευτερόλεπτα (για λογους τεστ) να ξαναθυμίσει
routing (με Home και Postpone σελίδες) με τη μέθοδο inject() της Angular https://angular.dev/guide/dependency-injection#inject
The inject() function allows you to retrieve a dependency in places where constructor injection is not available, such as in functions, or to make code cleaner in standalone components and services.

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-example',
  template: `<button (click)="goHome()">Go Home</button>`
})
export class ExampleComponent {
  private router = inject(Router);

  goHome() {
    this.router.navigate(['/']);
  }
}

Η επιλογή αποθηκεύεται προσωρινά στο LOcalStorage (CLT+shift+I)


