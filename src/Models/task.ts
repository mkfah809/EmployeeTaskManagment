import { Employee } from "./employee";

export interface Task {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: string;
    dateTime: Date;
    // List of associated tasks (many-to-many relationship)
    employees: Employee[];
}