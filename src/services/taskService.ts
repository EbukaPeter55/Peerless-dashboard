import api from "../api/axios";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: "Pending" | "In Progress" | "Completed";
}

export const TaskService = {
    getAllTasks: async (): Promise<Task[]> => {
        const response = await api.get<Task[]>("/tasks");
        return response.data;
    },

    getTaskById: async (id: number): Promise<Task> => {
        const response = await api.get<Task>(`/tasks/${id}`);
        return response.data;
    },

    // Example of scalability: easy to add new methods
    updateTaskStatus: async (id: number, status: Task["status"]): Promise<Task> => {
        const response = await api.patch<Task>(`/tasks/${id}`, { status });
        return response.data;
    }
};
