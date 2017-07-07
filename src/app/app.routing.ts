import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/index';
import { RefreshComponent } from './_directives/index';
import { LoginComponent } from './login/index';
import { ProjectComponent } from './project/index';
import { ApplicationsComponent, UpdateApplicationsComponent } from './applications/index';
import { WorkspaceComponent } from './workspace/index';
import { TestElementsComponent, TestElementStoreComponent } from './testelements/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'refresh', component: RefreshComponent },
    { path: '', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'workspace', component: WorkspaceComponent, canActivate: [AuthGuard] },
    { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard] },
    { path: 'applications/:mode', component: UpdateApplicationsComponent, canActivate: [AuthGuard] },
    { path: 'testelements', component: TestElementsComponent, canActivate: [AuthGuard] },
    { path: 'testelements/store', component: TestElementStoreComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes); //, { useHash: true }