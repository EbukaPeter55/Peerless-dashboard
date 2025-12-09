import { useContext } from "react";
import styled from "styled-components";
import DoughnutChart from "../components/charts/DoughnutChart";
import BarChart from "../components/charts/BarChart";
import { TaskContext } from "../context/TaskContext";
import { getStatusColor } from "../utils/statusUtils";

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

export default function Dashboard() {
    const taskContext = useContext(TaskContext);

    // Default to empty if context is somehow not available
    const tasks = taskContext?.tasks || [];

    // Calculate status counts
    const statusCounts = tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Ensure consistent order or use what's available
    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);

    // Map labels to colors for consistency with Table


    const colors = labels.map(label => getStatusColor(label));

    return (
        <Page>
            <DashboardGrid>
                <ChartCard>
                    <h3>Task Status Distribution</h3>
                    <DoughnutChart labels={labels} data={data} colors={colors} />
                </ChartCard>

                <ChartCard>
                    <h3>Task Count by Status</h3>
                    <BarChart labels={labels} data={data} colors={colors} />
                </ChartCard>
            </DashboardGrid>
        </Page>
    );
}