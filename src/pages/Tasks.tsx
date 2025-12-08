import { useState, useMemo } from "react";
import styled from "styled-components";
import Table, { type Column } from "../components/shared/Table";
import { useTasks } from "../hooks/useTasks";
import { type Task } from "../services/taskService";
import { FiEye, FiEdit2 } from "react-icons/fi";
import Modal from "../components/shared/Modal";

const Page = styled.div`
  /* padding handled by Layout */
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  min-width: 150px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  
  &:hover {
      background: #f5f5f5;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  p {
      color: #555;
      line-height: 1.5;
  }
  
  label {
      font-weight: 600;
      font-size: 14px;
      color: #333;
  }
`;

const SaveButton = styled.button`
    background: #6c4af2;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    
    &:hover {
        background: #5b3ddb;
    }
`;

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
        {
            key: "actions" as any,
            header: "Actions",
            render: (task) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <FiEye size={18} style={{ cursor: "pointer", color: "#666" }} onClick={() => handleView(task)} />
                    <FiEdit2 size={18} style={{ cursor: "pointer", color: "#6c4af2" }} onClick={() => handleEdit(task)} />
                </div>
            )
        }
    ];

    if (loading) return <Page>Loading tasks...</Page>;
    if (error) return <Page>Error: {error}</Page>;

    return (
        <Page>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>Tasks Board</h2>
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
            </div>

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
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label>Status</label>
                                <Select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value as any)}
                                    style={{ width: "100%" }}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </Select>
                                <div style={{ height: "10px" }} />
                                <SaveButton onClick={handleSave}>Save Changes</SaveButton>
                            </div>
                        )}
                    </ModalContent>
                )}
            </Modal>
        </Page>
    );
}
