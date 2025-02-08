import { Component, inject, Input } from '@angular/core';
import { TasksService } from '../tasks.service';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

import { Task } from 'zone.js/lib/zone-impl';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatButtonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task: any;
  //router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  constructor(private tasksService: TasksService) {

  }
  onCompleted(task: Task) {
    this.tasksService.taskCompleted(this.task,!this.task.completed);
    console.log(task);
  }
  onDelete(task: Task) {
    this.tasksService.deleteTask(this.task);
    console.log(task);
  }
}

