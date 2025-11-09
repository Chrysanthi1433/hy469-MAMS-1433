// src/app/socket.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private pongSubject = new Subject<any>();
  private reminderSubject = new Subject<any>();

  constructor() {
    console.log('[mock-socket] Demo mode: no real server');

    // Προσομοίωση: κάθε 10s στέλνουμε ένα medication reminder
    interval(10000).subscribe(() => {
      this.reminderSubject.next({
        id: Math.random().toString(36).slice(2, 8),
        text: 'Πάρε το χάπι σου',
        dueAt: new Date().toISOString()
      });
    });
  }

  // Όταν πατάς Send Ping, στέλνουμε αμέσως ένα fake pong
  sendPing(): void {
    this.pongSubject.next({
      ok: true,
      echo: { ts: Date.now() },
      at: new Date().toISOString()
    });
  }

  onPong(): Observable<any> {
    return this.pongSubject.asObservable();
  }

  onMedicationReminder(): Observable<any> {
    return this.reminderSubject.asObservable();
  }
}