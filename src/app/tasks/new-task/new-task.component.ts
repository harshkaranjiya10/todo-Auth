import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})

export class NewTaskComponent {
  openSnackBar(arg0: any, arg1: any) {
    throw new Error('Method not implemented.');
  }
  form = new FormGroup({
    title: new FormControl('', { validators: Validators.required }),
    description: new FormControl('', { validators: Validators.required }),
  });
  constructor() {}
  private router = inject(Router); 
  private tasksService = inject(TasksService);  
  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      const userId = this.tasksService.getUserId();
      this.tasksService.addTask({
        id: Date.now().toString(),
        title: this.form.value.title!,
        description: this.form.value.description!,
        completed: false,
        userId: userId,
      });
      //this.form.reset();
      this.router.navigate(['/tasks']);
    }
  }
}
