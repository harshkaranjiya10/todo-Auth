import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard, AuthGuard2 } from './auth/auth/auth.guard';
import { UsersComponent } from './admin-dashboard/users/users.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-tasks',
    // component: NewTaskComponent,
    loadComponent: () =>
      import('./tasks/new-task/new-task.component').then(
        (m) => m.NewTaskComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-tasks/:email',
    loadComponent: () => import('./admin-dashboard/admin-tasks/admin-tasks.component').then((m) => m.AdminTasksComponent),
  },
  {
    path: "admin",
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then((m)=>m.AdminDashboardComponent)
  }, 
  {
    path: "users",
    loadComponent: () => import('./admin-dashboard/users/users.component').then((m)=>m.UsersComponent)
  }
];
