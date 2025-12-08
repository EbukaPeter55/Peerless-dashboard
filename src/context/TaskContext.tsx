import type { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";
import { type Task, TaskService } from "../services/taskService";

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    refreshTasks: () => void;
    updateTask: (updatedTask: Task) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (updatedTask: Task) => {
        try {
            const result = await TaskService.updateTaskStatus(updatedTask.id, updatedTask.status);
            setTasks(prev => prev.map(t => t.id === result.id ? result : t));
        } catch (err: any) {
            console.error("Failed to update task", err);
            throw err;
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, loading, error, refreshTasks: fetchTasks, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};
