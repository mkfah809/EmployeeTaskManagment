import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/task';
import { TaskService } from '../../app/Services/tasks/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../app/Services/employees/employee.service';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
  task: Task = { 
        id: 0, 
        taskName: '', 
        taskDescription: '', 
        taskStatus: '', 
        dateTime: new Date(), 
        employees: [] 
      };
  isUpdate: boolean = false;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private taskService: TaskService) { }

  ngOnInit(): void {
    const taskId = +this.route.snapshot.paramMap.get('id')!;
    if (taskId) {
      this.isUpdate = true;
      this.taskService.getTask(taskId).subscribe(data => {
        this.task = data;
      });
    }
  }

  createTask(): void {
    this.taskService.createTask(this.task, []).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  updateTask(): void {
    this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  saveTask(): void {
    if (this.isUpdate) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

}
