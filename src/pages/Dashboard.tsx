import styled from "styled-components";
import DoughnutChart from "../components/charts/DoughnutChart";
import BarChart from "../components/charts/BarChart";
import Table, { type Column } from "../components/shared/Table";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const Page = styled.div`
  /* padding handled by Layout */
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ChartCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
`;

// Data Types
interface DepartmentData {
    dept: string;
    doctor: string;
    gender: string;
    head: string;
    status: string;
}

const departmentData: DepartmentData[] = [
    { dept: "ICU", doctor: "Kicker Nicil", gender: "Male", head: "Heidry Kon", status: "Active" },
    { dept: "Emergency", doctor: "Kilian James", gender: "Male", head: "Thomas Fletcher", status: "Inactive" },
    { dept: "ICU", doctor: "Deler Karon", gender: "Female", head: "Jonathan Doe", status: "Active" },
];

export default function Dashboard() {

    const columns: Column<DepartmentData>[] = [
        { key: "dept", header: "Department Name" },
        { key: "doctor", header: "Doctor" },
        { key: "gender", header: "Gender" },
        { key: "head", header: "Head Of Department" },
        {
            key: "actions",
            header: "Actions",
            render: () => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <FiEye size={18} />
                    <FiEdit size={18} />
                    <FiTrash2 size={18} color="red" />
                </div>
            )
        },
        {
            key: "status",
            header: "Status",
            render: (row) => (
                <span
                    style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        background: row.status === "Active" ? "#e6ffe8" : "#ffe6e6",
                        color: row.status === "Active" ? "#0a9a00" : "#cc0000",
                    }}
                >
                    {row.status}
                </span>
            )
        }
    ];

    return (
        <Page>
            <DashboardGrid>
                <ChartCard>
                    <h3>Patient Visit By Department</h3>
                    <DoughnutChart />
                </ChartCard>

                <ChartCard>
                    <h3>Employees</h3>
                    <BarChart />
                </ChartCard>
            </DashboardGrid>

            <Table
                title="Department List"
                columns={columns}
                data={departmentData}
            />
        </Page>
    );
}