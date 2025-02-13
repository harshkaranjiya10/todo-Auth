import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { Task, TasksService } from '../../tasks/tasks.service';
import { Personal } from '../users/users.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../../tasks/task/task.component';
@Component({
  selector: 'app-admin-tasks',
  standalone: true,
  imports: [CommonModule,TaskComponent],
  templateUrl: './admin-tasks.component.html',
  styleUrl: './admin-tasks.component.css'
})
export class AdminTasksComponent implements OnInit {
  paramValue: string | null = '';
  selectedUser: Personal | null = null;
  tasks: Task[] = [];
  constructor(private tasksService: TasksService,private route: ActivatedRoute, private cdr: ChangeDetectorRef){}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.paramValue = params.get('email');
      console.log('Received email param:', this.paramValue);

      if (this.paramValue) {
        this.tasks = this.tasksService.getTasksId(this.paramValue);
        this.tasksService.tasksSubject.next(this.tasks);
  
        this.tasksService.tasksSubject.subscribe(tasks => {
          if (this.paramValue) {
            this.tasks = tasks.filter(task => task.userId === this.paramValue);
            console.log('Updated tasks:', this.tasks);
            this.cdr.detectChanges();
          }
        });
      }
    });
}

}
