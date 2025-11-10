# MAMS – Wall-Mounted – v1

Πρώτη σελίδα **Medication Reminder** (μόνο αρχική οθόνη), φτιαγμένη με **Angular 20** σε **standalone component**.

---

## Τι περιλαμβάνει

- Τίτλος: «Ώρα για το χάπι της πίεσης».
- Εικόνα χαπιού με **fallback** (SVG) αν αποτύχει το φορτώσιμο.
- φωνητικές οδηγίες (**Web Speech API** – `speechSynthesis`, `el-GR`).
- Δύο μεγάλα κουμπιά:
  - **«Το πήρα»** → πράσινο διακριτικό ✓ για 1s + TTS «Μπράβο! Πήρες το χάπι.»
  - **«Αργότερα»** → TTS «Εντάξει, θα το πάρεις αργότερα.» + πλοήγηση στο `/postpone` (θα υλοποιηθεί στο v2).
- Προσβασιμότητα: `@media (prefers-reduced-motion: reduce)` απενεργοποιεί animations για χρήστες που το έχουν ζητήσει.

> **Σημείωση:** Στην έκδοση **v1** δεν υλοποιούμε ακόμα τη σελίδα αναβολής (*postpone screen*). Το routing είναι προετοιμασμένο για το **v2**.

---

## standalone component (χωρίς NgModule)

**Standalone Components** (π.χ. `standalone: true`) ώστε να μην χρειάζεται `AppModule`.

Στο component import:
- `CommonModule` → για βασικές οδηγίες όπως `*ngIf` (χρησιμοποιείται στο ✓ feedback).
- `RouterModule` + `RouterOutlet` → για routing και μελλοντική φόρτωση της σελίδας `/postpone`.

Τα κουμπιά είναι **απλά HTML `<button>`** με **δικό CSS** (όχι Angular Material).

---

## Α(Angular Docs)

Στο Angular documentation για **standalone components** φαίνεται ότι μπορείς να περάσεις ό,τι χρειάζεσαι στο `imports`.  

```ts
@Component({
  standalone: true,
  selector: 'photo-gallery',
  // an existing module is imported directly into a standalone component
  imports: [MatButtonModule],
  template: `
    ...
    <button mat-button>Next Page</button>
  `,
})
export class PhotoGalleryComponent {
  // logic
}