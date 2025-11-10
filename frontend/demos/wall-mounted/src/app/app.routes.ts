import { Routes } from '@angular/router';
import { PostponeComponent } from './pages/postpone.component';

export const routes: Routes = [
  { path: 'postpone', component: PostponeComponent, title: 'Αναβολή' },
  { path: '**', redirectTo: '' }
];