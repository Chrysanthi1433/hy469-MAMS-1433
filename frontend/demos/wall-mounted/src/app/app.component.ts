import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div class="container">
      <h1 class="title">Ώρα για το χάπι της πίεσης</h1>

      <div class="pill-section">
        <img [src]="pillUrl" alt="Tritace pill" class="pill-img" (error)="onImgError()" />
      </div>

      <div class="voice-instruction">
        <p>
          Πες: <strong>Το πήρα</strong> ή <strong>Αργότερα</strong>
          <span class="mic">🎤</span>
        </p>
      </div>

      <div class="actions">
        <button class="btn btn-primary" (click)="confirmTaken()">Το πήρα</button>
        <button class="btn btn-secondary" (click)="postpone()">Αργότερα</button>
      </div>

      <!-- Διακριτικό οπτικό feedback: πράσινο check για 1s -->
      <div class="tick-wrap" aria-hidden="true">
        <div class="tick" *ngIf="showTick">✓</div>
      </div>

      <!-- Εδώ θα εμφανιστεί το PostponeComponent όταν πάμε στο /postpone -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container { background: AliceBlue; text-align: center; font-family: system-ui, sans-serif; padding: 24px; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; position: relative; }
    .title { font-size: 3rem; font-weight: 700; margin-top: 20px; }
    .pill-section { margin: 20px auto; }
    .pill-img { width: 180px; height: auto; border-radius: 12px; border: 2px solid #ccc; }
    .voice-instruction { font-size: 1.5rem; margin: 12px 0; display:flex; flex-direction:column; align-items:center; gap:12px; }
    .mic { font-size: 2rem; margin-left: 8px; }
    .actions { display: flex; justify-content: space-around; margin-bottom: 20px; }
    .btn { font-size: 2rem; padding: 16px 28px; border-radius: 12px; border: none; cursor: pointer; font-weight: bold; }
    .btn-primary { background: black; color: white; }
    .btn-secondary { background: black; color: white; }

    /* ---- Discreet green check ---- */
    .tick-wrap { position: fixed; inset: 0; pointer-events: none; display: grid; place-items: center; }
    .tick {
      background: rgba(15, 185, 95, 0.1);
      color: #0fb95f;
      border: 3px solid #0fb95f;
      width: 96px; height: 96px;
      border-radius: 50%;
      display: grid; place-items: center;
      font-size: 64px; font-weight: 900;
      box-shadow: 0 6px 24px rgba(15,185,95,0.35);
      animation: tick-pop 1s ease forwards;
    }
    @keyframes tick-pop {
      0%   { transform: scale(0.6); opacity: 0; }
      20%  { transform: scale(1.05); opacity: 1; }
      40%  { transform: scale(1.0); }
      80%  { opacity: 1; }
      100% { opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .tick { animation: none; opacity: 1; }
    }
  `]
})
export class AppComponent implements AfterViewInit {
  private router = inject(Router);

  pillUrl = 'https://raw.githubusercontent.com/Chrysanthi1433/hy469-MAMS-1433/main/frontend/src/assets/Tritace10.jpg';
  readonly fallbackDataUrl =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="280" height="180">
      <rect width="100%" height="100%" rx="12" fill="#eef6ff"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-size="20" font-family="Arial" fill="#0ea5e9">Fallback</text>
    </svg>`);

  // Διακριτικό feedback flag
  showTick = false;

  onImgError() {
    this.pillUrl = this.fallbackDataUrl;
  }

  confirmTaken() {
    // 1) Διακριτικό οπτικό feedback (✓ για 1s)
    this.flashTick(1000);
    // 2) Φωνητικό μήνυμα (προαιρετικό – το κρατάμε όπως ήθελες)
    this.speakOnce('Μπράβο! Πήρες το χάπι.');
  }

  postpone() {
  
    this.speakOnce('Εντάξει, θα το πάρεις αργότερα.');
    // ➜ Πλοήγηση σε σελίδα αναβολής (εκεί θα φτιάξουμε επιλογή χρόνου σε άλλο component)
    this.router.navigate(['/postpone']);
  }

  ngAfterViewInit() {
    // Μικρή καθυστέρηση για να φορτώσουν οι φωνές & να “ξυπνήσει” το TTS
    setTimeout(() => this.speakOnce('Ώρα για το χάπι της πίεσης. Πες: Το πήρα ή Αργότερα.'), 400);

    // Fallback: αν ο browser μπλοκάρει autoplay, μίλα στο πρώτο user gesture
    const once = () => {
      this.speakOnce('Ώρα για το χάπι της πίεσης. Πες: Το πήρα ή Αργότερα.');
      window.removeEventListener('pointerdown', once, { capture: true } as any);
      window.removeEventListener('keydown', once, { capture: true } as any);
    };
    window.addEventListener('pointerdown', once, { capture: true } as any);
    window.addEventListener('keydown', once, { capture: true } as any);
  }

  private flashTick(ms = 1000) {
    this.showTick = true;
    setTimeout(() => (this.showTick = false), ms);
  }

  private speakOnce(text: string) {
    const speak = () => {
      try {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'el-GR';

        const voices = speechSynthesis.getVoices();
        const greekVoice =
          voices.find(v => v.lang?.toLowerCase().startsWith('el')) ||
          voices.find(v => /female|natural/i.test(v.name));
        if (greekVoice) utterance.voice = greekVoice;

        setTimeout(() => speechSynthesis.speak(utterance), 0);
      } catch {}
    };
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = speak;
    } else {
      speak();
    }
  }
}