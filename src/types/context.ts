import type { Task } from "./task";

export interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    refreshTasks: () => void;
    updateTask: (updatedTask: Task) => Promise<void>;
}
