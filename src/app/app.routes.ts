import { Routes } from '@angular/router';
import { authenticationGuard } from '../guards/authentication.guard';
import { HomeComponent } from '../views/home/home.component';
import { LoginComponent } from '../views/login/login.component';
import { LogOutComponent } from '../views/logout/logout.component';
import { OrganizationContainer } from '../views/organizations/organization-container/organization.container';
import { OrganizationDetailsComponent } from '../views/organizations/organization-details/organization-details.component';
import { OrganizationListComponent } from '../views/organizations/organization-list/organization-list.component';
import { OrganizationAddComponent } from '../views/organizations/organization-write/organization-add.component';
import { OrganizationEditComponent } from '../views/organizations/organization-write/organization-edit.component';
import { PageNotFoundComponent } from '../views/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogOutComponent },
    {
        path: 'organizations',
        component: OrganizationContainer,
        canActivate: [authenticationGuard],
        children: [
            {
                path: '',
                component: OrganizationListComponent
            },
            {
                path: 'add',
                component: OrganizationAddComponent
            },
            {
                path: 'details',
                component: OrganizationDetailsComponent
            },
            {
                path: 'edit',
                component: OrganizationEditComponent
            },
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
