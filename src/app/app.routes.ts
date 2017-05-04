import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const APP_ROUTES: Routes = [
    // Home
    { path: '', component: HomeComponent, pathMatch: 'full' },

    // 404
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);