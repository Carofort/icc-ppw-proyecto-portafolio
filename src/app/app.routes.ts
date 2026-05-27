import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Developers } from './features/developers/developers';
import { ContactRequests } from './features/contact-requests/contact-requests';
import { Projects } from './features/projects/projects';

export const routes: Routes = [

    { path: '', component: Home},
    { path: 'home', component: Home},
    { path: 'developers', component: Developers },
    { path: 'projects', component: Projects },
    { path: 'contact-requests', component: ContactRequests },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
