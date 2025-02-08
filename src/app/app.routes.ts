import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { NewTaskComponent } from './tasks/new-task/new-task.component';

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
  /* {
        path: 'new-tasks',
        component: NewTasksComponent
    } */
];
