import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES: Routes = [
    // Home
    { path: '', component: HomeComponent, pathMatch: 'full' },
    // Register
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    // login
    { path: 'login', component: LoginComponent, pathMatch: 'full' },

    // 404
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
