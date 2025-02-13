import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [];
  tasksSubject = new BehaviorSubject<Task[]>([]);
  userIdSubject = new BehaviorSubject<string>('');
  //tasks$ = this.tasksSubject.asObservable();

  private userId!: string;
  isEdit = false;
  //tasks$: any;
  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    const userData = localStorage.getItem('userData');

    if (storedTasks) {
      this.tasksSubject.next(JSON.parse(storedTasks));
      this.tasks = JSON.parse(storedTasks); 
    }
    if(userData) {
      this.userId = JSON.parse(userData).email;
      this.userIdSubject.next(JSON.parse(userData));
      this.userIdSubject.next(this.userId);
    }
  }
  
  setUserId(id: string) {
    this.userId = id;
    this.userIdSubject.next(this.userId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  
  getUserId(): string {
    const userData = localStorage.getItem('userData');
    if(userData) {
      this.userId = JSON.parse(userData).email;
      this.userIdSubject.next(this.userId);
    }
    return this.userId;
  }
  addTask(task: Task) {
    task.userId = this.userId;
    console.log(this.userId);
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  
  getTasks(): Task[] {
    return this.tasks;
  }
  
  taskCompleted(task: Task, completed: boolean) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index].completed = completed;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.tasksSubject.next(this.tasks);
    }
  }
  
  deleteTask(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index > -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.tasksSubject.next(this.tasks);
    }
  }
  getTasksId(userId: string): Task[] {
    this.tasksSubject.next(this.tasks);
    const filteredTasks = this.tasks.filter(task => task.userId === userId);
    this.tasksSubject.next(filteredTasks);

    console.log('filteredTasks');
    console.log(filteredTasks);
    
    return filteredTasks;
  }  
  
  updateTask(task: Task, updatedTask: any) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.tasksSubject.next(this.tasks);
    }
  }
  
}