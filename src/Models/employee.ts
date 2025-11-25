import { Task } from "./task";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    position: string
    // List of associated tasks (many-to-many relationship)
    tasks: Task[];
}