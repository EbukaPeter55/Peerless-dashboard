import styled from "styled-components";
import Table, { type Column } from "../components/shared/Table";
import { useTasks } from "../hooks/useTasks";
import { type Task } from "../services/taskService";

const Page = styled.div`
  /* padding handled by Layout */
`;

export default function Tasks() {
    const { tasks, loading, error } = useTasks();

    const columns: Column<Task>[] = [
        { key: "id", header: "ID" },
        { key: "title", header: "Title" },
        { key: "description", header: "Description" },
        {
            key: "status",
            header: "Status",
            render: (task) => (
                <span style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: task.status === "Completed" ? "#e6ffe8" : task.status === "In Progress" ? "#fff4e6" : "#ffe6e6",
                    color: task.status === "Completed" ? "#0a9a00" : task.status === "In Progress" ? "#d97706" : "#cc0000",
                    fontWeight: 500
                }}>
                    {task.status}
                </span>
            )
        },
    ];

    if (loading) return <Page>Loading tasks...</Page>;
    if (error) return <Page>Error: {error}</Page>;

    return (
        <Page>
            <h2>Tasks Board</h2>
            <Table
                title="Project Tasks"
                columns={columns}
                data={tasks}
            />
        </Page>
    );
}
