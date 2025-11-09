// src/app/app.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';   // για *ngIf, *ngFor
import { Subscription } from 'rxjs';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],   // <-- σημαντικό για τα structural directives
  template: `
    <h1>MAMS Socket Demo</h1>

    <button (click)="sendPing()">Send Ping</button>

    <section *ngIf="lastPong">
      <h3>Last pong:</h3>
      <pre>{{ lastPong | json }}</pre>
    </section>

    <section *ngIf="lastReminder">
      <h3>Last medication:reminder:</h3>
      <pre>{{ lastReminder | json }}</pre>
    </section>
  `,
})
export class AppComponent implements OnDestroy {
  lastPong: any = null;
  lastReminder: any = null;

  private subs: Subscription[] = [];

  constructor(private socketSvc: SocketService) {
    // ακούμε 'pong'
    this.subs.push(
      this.socketSvc.onPong().subscribe((data) => {
        this.lastPong = data;
        console.log('[socket] pong:', data);
      })
    );

    // ακούμε 'medication:reminder'
    this.subs.push(
      this.socketSvc.onMedicationReminder().subscribe((payload) => {
        this.lastReminder = payload;
        console.log('[socket] medication:reminder →', payload);
      })
    );
  }

  sendPing() {
    this.socketSvc.sendPing();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}