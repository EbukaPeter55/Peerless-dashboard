import api from "../api/axios";
import type { Task } from "../types/task";

export const TaskService = {
    getAllTasks: async (): Promise<Task[]> => {
        const response = await api.get<Task[]>("/tasks");
        return response.data;
    },

    getTaskById: async (id: number): Promise<Task> => {
        const response = await api.get<Task>(`/tasks/${id}`);
        return response.data;
    },

    updateTaskStatus: async (id: number, status: Task["status"]): Promise<Task> => {
        const response = await api.patch<Task>(`/tasks/${id}`, { status });
        return response.data;
    }
};
