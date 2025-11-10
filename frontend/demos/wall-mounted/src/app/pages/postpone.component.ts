// src/app/pages/postpone.component.ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-postpone',
  template: `
    <section style="font-family: system-ui, sans-serif; padding: 24px;">
      <h2 style="font-size: 2rem; margin-bottom: 12px;">Αναβολή υπενθύμισης</h2>
      <p style="font-size: 1.25rem;">Η υπενθύμιση μεταφέρθηκε “για αργότερα”.</p>
    </section>
  `
})
export class PostponeComponent {}