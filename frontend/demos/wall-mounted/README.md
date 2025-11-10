# MAMS – Wall-Mounted – v1

Πρώτη σελίδα Medication Reminder (μόνο αρχική οθόνη), φτιαγμένη με standalone component.

---

##  Περιλαμβάνει

- Τίτλος: «Ώρα για το χάπι της πίεσης».
- Εικόνα χαπιού με fallback (SVG) αν αποτύχει το φορτώσιμο.
- φωνητικές οδηγίες (Web Speech API – `speechSynthesis`, `el-GR`).
- Δύο μεγάλα κουμπιά:
  - «Το πήρα» → πράσινο διακριτικό ✓ για 1s + TTS «Μπράβο! Πήρες το χάπι.»
  - «Αργότερα»→ TTS «Εντάξει, θα το πάρεις αργότερα.» + πλοήγηση στο `/postpone` (θα υλοποιηθεί στο v2).
- Προσβασιμότητα: `@media (prefers-reduced-motion: reduce)` απενεργοποιεί animations για χρήστες που το έχουν ζητήσει (accessibility).


---

## standalone component (χωρίς NgModule)

`standalone: true`

Στο component import:
- `CommonModule` → για βασικές οδηγίες όπως `*ngIf` (χρησιμοποιείται στο ✓ feedback).
- `RouterModule` + `RouterOutlet` → για routing και μελλοντική φόρτωση της σελίδας `/postpone`.

Τα κουμπιά είναι HTML `<button>` με CSS

---


Angular documentation για standalone components   `imports`.  

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