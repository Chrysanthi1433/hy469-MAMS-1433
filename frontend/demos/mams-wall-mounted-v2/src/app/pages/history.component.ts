import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface MedicationLog {
  id: number;
  medicationName: string;
  scheduledTime: string;
  takenTime: string | null;
  status: 'taken' | 'missed' | 'postponed';
  date: string;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="title">Ιστορικό Λήψεων</h1>
        <div class="spacer"></div>
      </div>

      <div class="stats-card">
        <div class="stat">
          <div class="stat-value">{{ calculateAdherence() }}%</div>
          <div class="stat-label">Συμμόρφωση</div>
        </div>
        <div class="stat">
          <div class="stat-value">{{ getTotalTaken() }}</div>
          <div class="stat-label">Δόσεις που πήρατε</div>
        </div>
        <div class="stat">
          <div class="stat-value">{{ getTotalMissed() }}</div>
          <div class="stat-label">Παραλήψεις</div>
        </div>
      </div>

      <div class="logs-section">
        <h2 class="section-title">Τελευταίες καταχωρήσεις</h2>
        <div class="log-list">
          <div class="log-item" *ngFor="let log of medicationLogs"
               [class.taken]="log.status === 'taken'"
               [class.missed]="log.status === 'missed'"
               [class.postponed]="log.status === 'postponed'">
            <div class="log-icon">
              <span *ngIf="log.status === 'taken'">✓</span>
              <span *ngIf="log.status === 'missed'">✗</span>
              <span *ngIf="log.status === 'postponed'">⏰</span>
            </div>
            <div class="log-content">
              <div class="log-med-name">{{ log.medicationName }}</div>
              <div class="log-time">
                {{ log.date }} • {{ log.scheduledTime }}
                <span *ngIf="log.takenTime && log.status === 'taken'"> → {{ log.takenTime }}</span>
              </div>
            </div>
            <div class="log-status">
              <span class="status-badge" [class]="log.status">
                {{ getStatusText(log.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .history-container {
      background: linear-gradient(180deg, #d4e4f7 0%, #e8f1fa 100%);
      min-height: 100vh;
      padding: 0;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background: rgba(255,255,255,0.5);
    }

    .back-btn {
      background: white;
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .back-btn:hover {
      transform: scale(1.05);
    }

    .back-btn:active {
      transform: scale(0.95);
    }

    .title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }

    .spacer {
      width: 44px;
    }

    .stats-card {
      display: flex;
      gap: 12px;
      padding: 20px;
      background: white;
      margin: 20px;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    }

    .stat {
      flex: 1;
      text-align: center;
      padding: 16px 8px;
      border-radius: 12px;
      background: #f8fafc;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 500;
    }

    .logs-section {
      padding: 0 20px 40px;
    }

    .section-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 16px 0;
    }

    .log-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .log-item {
      background: white;
      border-radius: 16px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      border-left: 4px solid transparent;
      transition: transform 0.2s;
    }

    .log-item:hover {
      transform: translateX(4px);
    }

    .log-item.taken {
      border-left-color: #22c55e;
    }

    .log-item.missed {
      border-left-color: #ef4444;
    }

    .log-item.postponed {
      border-left-color: #f59e0b;
    }

    .log-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .log-item.taken .log-icon {
      background: #dcfce7;
      color: #22c55e;
    }

    .log-item.missed .log-icon {
      background: #fee2e2;
      color: #ef4444;
    }

    .log-item.postponed .log-icon {
      background: #fef3c7;
      color: #f59e0b;
    }

    .log-content {
      flex: 1;
      min-width: 0;
    }

    .log-med-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 4px;
    }

    .log-time {
      font-size: 0.9rem;
      color: #64748b;
    }

    .log-status {
      flex-shrink: 0;
    }

    .status-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .status-badge.taken {
      background: #dcfce7;
      color: #16a34a;
    }

    .status-badge.missed {
      background: #fee2e2;
      color: #dc2626;
    }

    .status-badge.postponed {
      background: #fef3c7;
      color: #d97706;
    }

    @media (max-width: 640px) {
      .stats-card {
        flex-direction: column;
      }

      .stat {
        width: 100%;
      }

      .log-status {
        display: none;
      }
    }
  `]
})
export class HistoryComponent {
  medicationLogs: MedicationLog[] = [
    {
      id: 1,
      medicationName: 'Tritace 10mg',
      scheduledTime: '08:00',
      takenTime: '08:05',
      status: 'taken',
      date: '10/11/2025'
    },
    {
      id: 2,
      medicationName: 'Tritace 10mg',
      scheduledTime: '20:00',
      takenTime: '20:15',
      status: 'taken',
      date: '09/11/2025'
    },
    {
      id: 3,
      medicationName: 'Tritace 10mg',
      scheduledTime: '08:00',
      takenTime: null,
      status: 'missed',
      date: '09/11/2025'
    },
    {
      id: 4,
      medicationName: 'Tritace 10mg',
      scheduledTime: '20:00',
      takenTime: '20:45',
      status: 'postponed',
      date: '08/11/2025'
    },
    {
      id: 5,
      medicationName: 'Tritace 10mg',
      scheduledTime: '08:00',
      takenTime: '08:02',
      status: 'taken',
      date: '08/11/2025'
    }
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  calculateAdherence(): number {
    const total = this.medicationLogs.length;
    const taken = this.medicationLogs.filter(log => log.status === 'taken').length;
    return total > 0 ? Math.round((taken / total) * 100) : 0;
  }

  getTotalTaken(): number {
    return this.medicationLogs.filter(log => log.status === 'taken').length;
  }

  getTotalMissed(): number {
    return this.medicationLogs.filter(log => log.status === 'missed').length;
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'taken': return 'Πήρα';
      case 'missed': return 'Παράλειψη';
      case 'postponed': return 'Αργότερα';
      default: return '';
    }
  }
}
