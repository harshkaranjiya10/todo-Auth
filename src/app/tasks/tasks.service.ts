import { Injectable } from '@angular/core';

interface Task {
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
  private tasks: Task[] = [
    {
      id: '123',
      userId: 'a',
      title: 'Gym',
      description: 'Upper Body',
      completed: false,
    },
    {
      userId: 'b',
      id: '101',
      title: 'Angular',
      description: 'Lazy Loading, Routing',
      completed: true,
    },
  ];
  private userId!: string;

  constructor() {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
  
  setUserId(id: string) {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }
  addTask(task: Task) {
    this.tasks.push(task);
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
    }
  }

  deleteTask(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
  getTasksId(userId: string): Task[] {
    return this.tasks.filter(task => task.userId === userId);
  }

}