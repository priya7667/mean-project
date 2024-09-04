import { Routes } from '@angular/router';
import { roleGuard } from './guard/role.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./components/user/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'portal',
        loadComponent: () => import('./components/portal/layout/layout.component').then(m => m.LayoutComponent),
        canActivate: [roleGuard],  // Apply the RoleGuard here
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./components/portal/dashboard/dashboard.component').then(m => m.DashboardComponent),
                canActivate: [roleGuard],  // Protect the dashboard
            },
            {
                path: 'leads',
                loadComponent: () => import('./components/portal/leads/leads.component').then(m => m.LeadsComponent),
                canActivate: [roleGuard],  // Protect leads
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full'
                    },
                    {
                        path: 'list',
                        loadComponent: () => import('./components/portal/leads/list/list.component').then(m => m.ListComponent),
                        canActivate: [roleGuard],  // Protect list
                    },
                    {
                        path: 'add-new',
                        loadComponent: () => import('./components/portal/leads/add-edit-form/add-edit-form.component').then(m => m.AddEditFormComponent),
                        canActivate: [roleGuard],  // Protect add-new
                    },
                    {
                        path: 'edit/:id', // Edit a specific lead by its ID
                        loadComponent: () => import('./components/portal/leads/add-edit-form/add-edit-form.component').then(m => m.AddEditFormComponent),
                        canActivate: [roleGuard],  // Protect edit
                    },
                    {
                        path: 'view/:id', // View a specific lead by its ID
                        loadComponent: () => import('./components/portal/leads/view/view.component').then(m => m.ViewComponent),
                        canActivate: [roleGuard],  // Protect view
                    }
                ]
            },
            {
                path: 'opportunities',
                loadComponent: () => import('./components/portal/opportunities/opportunities.component').then(m => m.OpportunitiesComponent),
                canActivate: [roleGuard],  // Protect opportunities
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full'
                    },
                    {
                        path: 'list',
                        loadComponent: () => import('./components/portal/opportunities/opportunities-list/opportunities-list.component').then(m => m.OpportunitiesListComponent),
                        canActivate: [roleGuard],  // Protect view
                    },
                    {
                        path: 'add-new',
                        loadComponent: () => import('./components/portal/opportunities/manage-opportunities-form/manage-opportunities-form.component').then(m => m.ManageOpportunitiesFormComponent),
                        canActivate: [roleGuard],  // Protect view
                    },
                    {
                        path: 'edit/:id', // Edit a specific lead by its ID
                        loadComponent: () => import('./components/portal/opportunities/manage-opportunities-form/manage-opportunities-form.component').then(m => m.ManageOpportunitiesFormComponent),
                        canActivate: [roleGuard],  // Protect edit
                    },
                    {
                        path: 'view/:id', // View a specific lead by its ID
                        loadComponent: () => import('./components/portal/opportunities/view/view.component').then(m => m.ViewComponent),
                        canActivate: [roleGuard],  // Protect view
                    }

                ]
            },
            {
                path: 'accounts',
                loadComponent: () => import('./components/portal/accounts/accounts.component').then(m => m.AccountsComponent),
                canActivate: [roleGuard],  // Protect accounts
            },
            {
                path: 'report-list',
                loadComponent: () => import('./components/portal/report-list/report-list.component').then(m => m.ReportListComponent),
                canActivate: [roleGuard],  // Protect report-list
            },
            {
                path: 'settings',
                loadComponent: () => import('./components/portal/settings/settings-layout/settings-layout.component').then(m => m.SettingsLayoutComponent),
                canActivate: [roleGuard],  // Protect settings
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./components/portal/settings/settings/settings.component').then(m => m.SettingsComponent),
                        canActivate: [roleGuard],  // Protect settings main page
                    },
                    {
                        path: 'leads',
                        loadComponent: () => import('./components/portal/settings/leads-settings/leads-settings.component').then(m => m.LeadsSettingsComponent),
                        canActivate: [roleGuard],  // Protect leads settings
                    },
                    {
                        path: 'opportunities',
                        loadComponent: () => import('./components/portal/settings/opportunities-settings/opportunities-settings.component').then(m => m.OpportunitiesSettingsComponent),
                        canActivate: [roleGuard],  // Protect opportunities settings
                    },
                    {
                        path: 'accounts',
                        loadComponent: () => import('./components/portal/settings/accounts-settings/accounts-settings.component').then(m => m.AccountsSettingsComponent),
                        canActivate: [roleGuard],  // Protect accounts settings
                    },
                    {
                        path: 'drop-down',
                        loadComponent: () => import('./components/portal/settings/drop-down-settings/drop-down-settings.component').then(m => m.DropDownSettingsComponent),
                        canActivate: [roleGuard],  // Protect drop-down settings
                    }
                ]
            },
        ]
    }
];
