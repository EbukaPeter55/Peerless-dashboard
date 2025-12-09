import { useState, useMemo } from "react";
import Table from "../components/shared/Table";
import type { Column } from "../types/table";
import { useTasks } from "../hooks/useTasks";
import { type Task } from "../types/task";
import Modal from "../components/shared/Modal";
import {
    Page,
    HeaderContainer,
    Title,
    ControlsContainer,
    Select,
    StartSelect,
    Button,
    ModalContent,
    SaveButton,
    FormContainer,
    StatusBadge,
    ActionsContainer,
    ViewIcon,
    EditIcon
} from "./Tasks.styles";

export default function Tasks() {
    const { tasks, loading, error, updateTask } = useTasks();
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [modalMode, setModalMode] = useState<"view" | "edit">("view");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Edit state
    const [editStatus, setEditStatus] = useState<Task["status"]>("Pending");

    const filteredTasks = useMemo(() => {
        let result = tasks;
        if (statusFilter !== "All") {
            result = result.filter(t => t.status === statusFilter);
        }

        return [...result].sort((a, b) => {
            const dateA = new Date(a.dueDate).getTime();
            const dateB = new Date(b.dueDate).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
    }, [tasks, statusFilter, sortOrder]);

    const handleView = (task: Task) => {
        setSelectedTask(task);
        setModalMode("view");
        setIsModalOpen(true);
    };

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        setEditStatus(task.status);
        setModalMode("edit");
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!selectedTask) return;
        await updateTask({ ...selectedTask, status: editStatus });
        setIsModalOpen(false);
    };

    const columns: Column<Task>[] = [
        { key: "id", header: "ID" },
        { key: "title", header: "Title" },
        { key: "description", header: "Description" },
        {
            key: "dueDate",
            header: "Due Date",
            render: (task) => new Date(task.dueDate).toLocaleDateString()
        },
        {
            key: "status",
            header: "Status",
            render: (task) => (
                <StatusBadge $status={task.status}>
                    {task.status}
                </StatusBadge>
            )
        },
        {
            key: "actions" as any,
            header: "Actions",
            render: (task) => (
                <ActionsContainer>
                    <ViewIcon size={18} onClick={() => handleView(task)} />
                    <EditIcon size={18} onClick={() => handleEdit(task)} />
                </ActionsContainer>
            )
        }
    ];

    if (loading) return <Page>Loading tasks...</Page>;
    if (error) return <Page>Error: {error}</Page>;

    return (
        <Page>
            <HeaderContainer>
                <Title>Tasks Board</Title>
                <ControlsContainer>
                    <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </Select>

                    <Button onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}>
                        Sort Date: {sortOrder.toUpperCase()}
                    </Button>
                </ControlsContainer>
            </HeaderContainer>

            <Table
                title={`Project Tasks (${filteredTasks.length})`}
                columns={columns}
                data={filteredTasks}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "view" ? "Task Details" : "Update Task"}
            >
                {selectedTask && (
                    <ModalContent>
                        <div>
                            <label>Title</label>
                            <p>{selectedTask.title}</p>
                        </div>
                        <div>
                            <label>Description</label>
                            <p>{selectedTask.description}</p>
                        </div>
                        <div>
                            <label>Due Date</label>
                            <p>{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                        </div>

                        {modalMode === "view" ? (
                            <div>
                                <label>Status</label>
                                <p>{selectedTask.status}</p>
                            </div>
                        ) : (
                            <FormContainer>
                                <label>Status</label>
                                <StartSelect
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value as any)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </StartSelect>
                                <SaveButton onClick={handleSave}>Save Changes</SaveButton>
                            </FormContainer>
                        )}
                    </ModalContent>
                )}
            </Modal>
        </Page>
    );
}
