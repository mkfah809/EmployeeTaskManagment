import { Component } from '@angular/core';
import { Task } from '../../../Models/task';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../app/Services/employees/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-task.component.html',
  styleUrl: './employee-task.component.css'
})
export class EmployeeTaskComponent {
  tasks: Task[] = [];

  constructor(private route: ActivatedRoute, 
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const employeeId = +this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getTasksByEmployeeId(employeeId)
                        .subscribe(data => {
                                      this.tasks = data;
                                    });
  }
}
