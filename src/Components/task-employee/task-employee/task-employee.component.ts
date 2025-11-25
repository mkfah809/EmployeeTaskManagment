import { Component } from '@angular/core';
import { Employee } from '../../../Models/employee';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../app/Services/tasks/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-employee.component.html',
  styleUrl: './task-employee.component.css'
})
export class TaskEmployeeComponent {
  employees: Employee[] = [];

  constructor(private route: ActivatedRoute,
              private taskService: TaskService) { }

  ngOnInit(): void {
    const taskId = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getEmployeesByTaskId(taskId)
                    .subscribe(data => {
                      this.employees = data;
                    });
  }
}
