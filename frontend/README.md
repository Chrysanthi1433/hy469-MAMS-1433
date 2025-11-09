
# MAMS Frontend Demo

Αυτό είναι το πρώτο demo για το Medication Adherence and Monitoring System (MAMS).

Ξεκίνησα την υλοποίηση από το βασικό feature: **Medication Reminder**.

Έφτιαξα ένα απλό Angular UI με:
- Κουμπί **Send Ping** για δοκιμή επικοινωνίας.
- Εμφάνιση του τελευταίου **medication reminder**.

Το demo τρέχει στο StackBlitz λόγω εταιρικού περιορισμού (δεν μπορώ να κάνω `npm install` τοπικά).

🔗 [Δείτε το project στο StackBlitz](https://stackblitz.com/edit/stackblitz-starters-f5shbezk?file=src%2Fmain.ts)

---

## Τι περιέχει

- **`app.component.ts`**  
  Το UI component δηλωμένο ως `standalone`. Περιλαμβάνει κουμπί και εμφάνιση δεδομένων με `data binding`.

- **`socket.service.ts`**  
  Mock service που χρησιμοποιεί `RxJS` (`Subject`, `interval`) για να στέλνει fake ping και medication reminders. Δηλώνεται με `providedIn: 'root'`.

- **`main.ts`**  
  Εκκίνηση της εφαρμογής με `bootstrapApplication(AppComponent)`, χωρίς χρήση `AppModule`, σύμφωνα με τις νέες πρακτικές της Angular για standalone components.

- **`index.html` και `global_styles.css`**  
  Βασικά αρχεία για το layout και το styling της εφαρμογής.

---

## Πηγές

- [Angular Standalone Components Guide](https://angular.io/guide/standalone-components)
- [Angular API – bootstrapApplication](https://angular.io/api/platform-browser/bootstrapApplication)
- [RxJS Library in Angular](https://angular.io/docs)
