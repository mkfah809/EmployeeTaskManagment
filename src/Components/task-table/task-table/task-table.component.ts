import { Component, OnInit } from '@angular/core';
import { Task } from '../../../Models/task';
import { TaskService } from '../../../app/Services/tasks/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  createTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  updateTask(taskId: number): void {
    this.router.navigate(['/tasks', taskId, 'edit']);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
    });
  }

  getEmployeesByTaskId(taskId: number): void {
    this.router.navigate(['/tasks', taskId, 'employees']);
  }
}