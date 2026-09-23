import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { LegalNotice } from './pages/legal-notice/legal-notice';
import { Privacy } from './pages/privacy/privacy';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Voltio Ahorro · Auditoría de luz y gas',
  },
  {
    path: 'legal-notice',
    component: LegalNotice,
    title: 'Términos y condiciones · Voltio Ahorro',
  },
  {
    path: 'privacy',
    component: Privacy,
    title: 'Política de privacidad · Voltio Ahorro',
  },
  { path: '**', redirectTo: '' },
];
