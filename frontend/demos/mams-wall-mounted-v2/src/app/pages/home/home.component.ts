import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit  {
  private router = inject(Router);
  private reminder = inject(ReminderService);

  currentTime = '';
  postponeCountdown = 0;
  private countdownInterval: any;
  pillUrl =
    'https://raw.githubusercontent.com/Chrysanthi1433/hy469-MAMS-1433/main/frontend/src/assets/Tritace10.jpg';

  readonly fallbackDataUrl =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120">
         <rect width="100%" height="100%" fill="#f3f4f6"/>
         <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af">Fallback</text>
       </svg>`
    );

  showTick = false;
  isPostponeRoute = false;
  private noResponseTimer: any;

  constructor() {
    this.router.events.subscribe(() => {
      this.isPostponeRoute = ['/postpone'].some((p) =>
        this.router.url.includes(p)
      );
      if (!this.isPostponeRoute) this.checkPostponeCountdown();
    });

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    this.currentTime = new Date().toLocaleTimeString('el-GR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  onImgError() {
    this.pillUrl = this.fallbackDataUrl;
  }

  private flashTick(ms = 1000) {
    this.showTick = true;
    setTimeout(() => (this.showTick = false), ms);
  }

  private speakOnce(text: string) {
    try {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'el-GR';
      speechSynthesis.speak(utterance);
    } catch {}
  }

  checkPostponeCountdown() {
    const seconds = sessionStorage.getItem('mams.postpone.seconds');
    if (seconds) {
      this.postponeCountdown = parseInt(seconds, 10);
      sessionStorage.removeItem('mams.postpone.seconds');

      if (this.countdownInterval) clearInterval(this.countdownInterval);
      this.countdownInterval = setInterval(() => {
        this.postponeCountdown--;
        if (this.postponeCountdown <= 0) {
          clearInterval(this.countdownInterval);
          this.speakOnce('Ώρα να πάρεις το φαρμακό σου!');
        }
      }, 1000);
    }
  }

  confirmTaken() {
    if (this.noResponseTimer) clearTimeout(this.noResponseTimer);
    this.flashTick(1000);
    this.speakOnce('Μπράβο κυρία Ελένη! Πήρες το χάπι.');
  }

  postpone() {
    if (this.noResponseTimer) clearTimeout(this.noResponseTimer);
    this.speakOnce('Εντάξει, θα το πάρεις αργότερα.');
    this.router.navigate(['/postpone']);
  }

  ngAfterViewInit() {
    setTimeout(
      () => this.speakOnce('Ώρα για το χάπι της πίεσης. Πες: Το πήρα ή Αργότερα.'),
      400
    );
  }
}