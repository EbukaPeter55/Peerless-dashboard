import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { DoughnutChartProps } from "../../types/chart";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ labels, data, colors }: DoughnutChartProps) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: colors || ["#6C4AF2", "#8D23F9", "#C77DFF"],
                borderWidth: 0,
            },
        ],
    };

    return <Doughnut data={chartData} />;
}