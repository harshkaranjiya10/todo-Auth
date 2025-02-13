import { Component, inject, Input } from '@angular/core';
import { TasksService } from '../tasks.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: any;
  //router = inject(Router);

  public tasks!: Task[];
  selectedTask!: Task;
  isSelected = false;
  editTask!: Task;
  deletedTask: Task | null = null; 
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string, action: string) {
    if (action === 'close') {
      this._snackBar.open(message, action, { duration: 1000 });
    } else {
      const snackBarRef = this._snackBar.open(message, 'Undo', { duration: 2000 });
      snackBarRef.onAction().subscribe(() => {
        if (this.deletedTask) {
          this.tasksService.addTask(this.deletedTask);
          //this.tasksService.tasksSubject.next(this.tasks)

          /* this.tasksService.tasksSubject.subscribe((tasks)=> {
            this.tasks = tasks
          }) */
          console.log('tasks updated Snatch' );
          console.log(this.tasks);
          
          this.deletedTask = null;
        }
      });
    }
  }
  
  editForm = new FormGroup({
    title: new FormControl(this.selectedTask?.title || '', { validators: Validators.required }),
    description: new FormControl(this.selectedTask?.description || '', { validators: Validators.required }),
  });
  constructor(
    private tasksService: TasksService,
    private cdr: ChangeDetectorRef
  ) {
    this.tasks = this.tasksService.getTasks();
  }

  onCompleted(task: Task) {
    this.tasksService.taskCompleted(this.task, !this.task.completed);
    console.log(task);
  }
  onDelete(task: Task) {
    this.deletedTask = task;
    this.tasksService.deleteTask(task);
    this.tasks = [...this.tasks];
    this.tasksService.tasksSubject.next(this.tasks)
    this.cdr.markForCheck();
    console.log(task);
    
    this.cdr.markForCheck();
  }
  
  onEdit(task: Task) {
    this.selectedTask = task;
    console.log(task);
    this.editForm = new FormGroup({
      title: new FormControl(this.selectedTask.title, { validators: Validators.required }),
      description: new FormControl(this.selectedTask.description, { validators: Validators.required }),
    });
    this.isSelected = !this.isSelected;
  }
  saveTask(task: Task) {
    if(this.editForm.value.title === '' || this.editForm.value.description === '') {
      return ; 
    }
    this.tasksService.updateTask(task, this.editForm.value);
    this.selectedTask = {} as Task;
    this.isSelected = !this.selectedTask;

  }   
}