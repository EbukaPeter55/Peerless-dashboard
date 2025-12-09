import styled from "styled-components";
import DoughnutChart from "../components/charts/DoughnutChart";
import BarChart from "../components/charts/BarChart";

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

export default function Dashboard() {

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
        </Page>
    );
}