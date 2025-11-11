import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'postpone',
    loadComponent: () =>
      import('./postpone-select/postpone-select.component').then(
        (m) => m.PostponeSelectComponent
      ),
  },
];
