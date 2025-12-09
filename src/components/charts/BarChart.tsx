import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import type { BarChartProps } from "../../types/chart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


export default function BarChart({ labels, data, colors }: BarChartProps) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Tasks",
                data: data,
                backgroundColor: colors || "#6C4AF2",
                borderRadius: 6,
            },
        ],
    };

    return <Bar data={chartData} />;
}