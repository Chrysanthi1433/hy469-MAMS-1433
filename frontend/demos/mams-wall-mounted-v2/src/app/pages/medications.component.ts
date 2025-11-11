import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Medication {
  name: string;
  time: string;
  dose: string;
  color: string;
  bgColor: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-medications',
  template: `
    <div class="medications-container">
      <!-- Header -->
      <header class="header">
        <h1 class="logo">MAMS</h1>
        <h2 class="header-title">Πρόγραμμα Φαρμάκων</h2>
      </header>

      <!-- Medications list -->
      <div class="meds-list">
        <div class="med-item" *ngFor="let med of medications">
          <div class="med-card" [style.background]="med.bgColor">
            <div class="med-card-header">{{ med.name }}</div>
            <div class="pill-icon" [style.background]="med.color">
              <span class="dose-label">{{ med.dose }}</span>
              <span class="tablets-label">Tablets</span>
            </div>
            <div class="barcode">|||||||||||</div>
          </div>

          <div class="med-details">
            <div class="med-time">{{ med.time }} — {{ med.name }}</div>
            <div class="med-dose">Δόση: {{ med.dose }}</div>
          </div>
        </div>
      </div>

      <!-- Exit button -->
      <div class="footer">
        <span class="footer-label">Πες: 'Έξοδος</span>
        <button class="exit-btn" (click)="exit()">
          Έξοδος
        </button>
      </div>
    </div>
  `,
  styles: [`
    .medications-container {
      min-height: 100vh;
      background: linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%);
      padding: 0;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .header {
      background: #2c3e50;
      color: white;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .header-title {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0;
    }

    .meds-list {
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .med-item {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 20px;
      align-items: center;
    }

    .med-card {
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .med-card-header {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1a1a1a;
      text-align: center;
    }

    .pill-icon {
      border-radius: 24px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      margin: 8px 0;
    }

    .dose-label {
      font-size: 1.1rem;
      font-weight: 700;
      color: white;
    }

    .tablets-label {
      font-size: 0.9rem;
      color: white;
      background: rgba(255,255,255,0.3);
      padding: 4px 12px;
      border-radius: 12px;
    }

    .barcode {
      text-align: center;
      font-size: 1.2rem;
      font-weight: 900;
      letter-spacing: -2px;
      color: #333;
    }

    .med-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .med-time {
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a1a;
    }

    .med-dose {
      font-size: 1.6rem;
      color: #555;
    }

    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      background: white;
      box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer-label {
      font-size: 1.4rem;
      color: #555;
    }

    .exit-btn {
      background: #1a1a1a;
      color: white;
      border: none;
      border-radius: 48px;
      padding: 16px 48px;
      font-size: 1.8rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      transition: transform 0.15s ease;
    }

    .exit-btn:active {
      transform: scale(0.98);
    }

    @media (max-width: 768px) {
      .med-item {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .med-card {
        max-width: 200px;
        margin: 0 auto;
      }
    }
  `]
})
export class MedicationsComponent implements OnInit {
  constructor(private router: Router) {}

  medications: Medication[] = [
    {
      name: 'Tritace',
      time: '08:00',
      dose: '10 mg',
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    {
      name: 'Dilatrend',
      time: '10:00',
      dose: '10 mg',
      color: '#dc2626',
      bgColor: '#fee2e2'
    },
    {
      name: 'Lasix',
      time: '12:00',
      dose: '20 mg',
      color: '#16a34a',
      bgColor: '#dcfce7'
    },
    {
      name: 'Aldactone',
      time: '16:00',
      dose: '25 mg',
      color: '#f97316',
      bgColor: '#ffedd5'
    },
    {
      name: 'Entresto',
      time: '20:00',
      dose: '10 mg',
      color: '#a855f7',
      bgColor: '#f3e8ff'
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.say('Πρόγραμμα φαρμάκων. Πες έξοδος για επιστροφή.');
    }, 300);
  }


  exit() {
    this.say('Επιστροφή.');
    this.router.navigateByUrl('/');
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
