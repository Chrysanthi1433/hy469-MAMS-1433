import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-alert',
  template: `
    <div class="alert-container">
      <!-- Status bar -->
      <div class="status-bar">
        <span class="logo">MAMS</span>
      </div>

      <!-- Header message -->
      <div class="header-message">
        <p>Ο ασθενής δεν ανταποκρίθηκε ούτε στην υπενθύμιση στο smartphone.
        Το σύστημα στέλνει αυτόματα μήνυμα στον caregiver για να ενημερωθεί.</p>
      </div>

      <!-- Alert card -->
      <div class="alert-card">
        <div class="alert-icon">!</div>
        <div class="alert-content">
          <h2 class="alert-title">Ειδοποίηση</h2>
          <p class="alert-subtitle"><strong>MAMS</strong> : Η μητέρα σας δεν πήρε το χάπι της.</p>
          <p class="alert-subtitle">Παρακαλώ επικοινωνήστε μαζί της.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .alert-container {
      min-height: 100vh;
      background: linear-gradient(180deg, #d4e4f7 0%, #e8f1fa 100%);
      padding: 0;
      font-family: system-ui, -apple-system, sans-serif;
    }

    /* Status bar */
    .status-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 20px;
      background: rgba(255,255,255,0.5);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 0.5px;
    }

    /* Header message */
    .header-message {
      padding: 20px;
      background: rgba(255,255,255,0.7);
      font-size: 0.95rem;
      line-height: 1.5;
      color: #333;
      text-align: center;
    }

    /* Alert card */
    .alert-card {
      background: white;
      margin: 40px 20px;
      padding: 32px 24px;
      border-radius: 20px;
      border: 3px solid #f59e0b;
      box-shadow: 0 8px 32px rgba(245, 158, 11, 0.2);
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    .alert-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #f59e0b;
      color: white;
      display: grid;
      place-items: center;
      font-size: 2.5rem;
      font-weight: 900;
      flex-shrink: 0;
    }

    .alert-content {
      flex: 1;
    }

    .alert-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 12px;
      color: #1a1a1a;
    }

    .alert-subtitle {
      font-size: 1.4rem;
      color: #333;
      margin: 8px 0;
      line-height: 1.5;
    }

    @media (max-width: 600px) {
      .alert-card {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
  `]
})
export class AlertComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.say('Ειδοποίηση. Η μητέρα σας δεν πήρε το χάπι της. Παρακαλώ επικοινωνήστε μαζί της.');
    }, 500);
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
