// src/app/services/reminder.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private storageKey = 'reminders';

  saveReminder(id: string, time: string) {
    const raw = localStorage.getItem(this.storageKey) || '[]';
    const reminders = JSON.parse(raw);
    reminders.push({ id, time, timestamp: new Date().toISOString() });
    localStorage.setItem(this.storageKey, JSON.stringify(reminders));
  }

  getReminders() {
    try { return JSON.parse(localStorage.getItem(this.storageKey) || '[]'); }
    catch { return []; }
  }
}