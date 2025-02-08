import { Component } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TaskComponent } from './task/task.component';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}
  tasks: Task[] = this.tasksService.getTasks();
  userId: string = '';
  asc = true;
  ngOnInit() {
    console.log(this.tasks);
    const userId = this.route.snapshot.paramMap.get('userId');
    this.tasksService.setUserId(userId ?? '');
    console.log(userId);

    if (userId) {
      this.tasks = this.tasksService.getTasksId(userId);
      console.log(this.tasks);
    } else {
      this.tasks = this.tasksService.getTasks();
      console.log(this.tasks);
    }
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
