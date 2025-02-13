import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, RouterLinkActive, RouterLink, MatCardModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  userId!: string;
  username!: string;
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.tasksService.userIdSubject.subscribe(
        (userId) => (userId = this.userId)
      );
      this.userId = JSON.parse(userData).email;
      this.username = this.userId.split('@')[0];
    }
  }
  tasks: Task[] = [];
  //userId: string = '';
  asc = true;
  ngOnInit() {
    console.log(this.tasks);
    if (this.userId) {
      this.tasksService.tasksSubject.pipe(
        map(tasks => tasks.filter(task => task.userId === this.userId))
      ).subscribe(filteredTasks => {
        this.tasks = filteredTasks;
        console.log(this.tasks);
      });
    } else {
      this.tasks = this.tasksService.getTasks();
      this.tasksService.tasksSubject.subscribe((tasks) => {
        this.tasks = tasks;
      });
      console.log(this.tasks);
    }
    this.cdr.markForCheck();
  }

  SortTasks() {
    if (this.asc) {
      this.tasks = this.tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.asc = !this.asc;
    } else {
      this.tasks = this.tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
      this.asc = !this.asc;
    }
  }
}
