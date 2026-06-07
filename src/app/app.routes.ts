import { Routes } from '@angular/router';
import { Developers } from './features/developers/developers';
import { ContactRequests } from './features/contact-requests/contact-requests';
import { Projects } from './features/projects/projects';
import { AuthPage } from './features/auth/pages/auth-page/auth-page';
import { AdminRequests } from './features/admin-requests/admin-requests';
import { Home } from './features/home/home';
export const routes: Routes = [

    { path: '', component: Home},
    { path: 'home', component: Home},
    { path: 'developers', component: Developers },
    { path: 'projects', component: Projects },
    { path: 'contact-requests', component: ContactRequests },
    { path: 'admin-requests', component: AdminRequests},
    { path: 'auth', component: AuthPage},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
