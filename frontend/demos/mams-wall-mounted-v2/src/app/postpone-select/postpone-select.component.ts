import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReminderService } from '../services/reminder.service';

@Component({
  standalone: true,
  selector: 'app-postpone-select',
  template: `
    <div class="postpone-container">
      <h1>Διάλεξε χρόνο αναβολής</h1>
      <div class="choices">
        <button (click)="choose(5)">5</button>
        <button (click)="choose(10)">10</button>
        <button (click)="choose(15)">15</button>
      </div>
      <button (click)="cancel()">Άκυρο</button>
    </div>
  `,
})
export class PostponeSelectComponent implements OnInit {
  private router = inject(Router);
  private reminder = inject(ReminderService);

  ngOnInit() {
    this.say('Πες μου σε πόσα δευτερόλεπτα να στο θυμίσω. Σε 5, σε 10 ή σε 15');
  }

  choose(seconds: number) {
    sessionStorage.setItem('mams.postpone.seconds', String(seconds));
    this.say(`Θα σου το θυμίσω σε ${seconds} δευτερόλεπτα.`);
    this.reminder.saveReminder('postpone', `${seconds} sec`);
    setTimeout(() => this.router.navigate(['/']), 1500);
  }

  cancel() {
    this.say('Ακύρωση αναβολής.');
    this.router.navigate(['/']);
  }

  private say(text: string) {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'el-GR';
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch {}
  }
}