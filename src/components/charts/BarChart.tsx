import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart() {
    const data = {
        labels: ["Emergency", "ICU", "Neurology", "Cardiology", "Gynecology", "Urology"],
        datasets: [
            {
                label: "% Staff",
                data: [30, 55, 80, 40, 65, 82],
                backgroundColor: "#6C4AF2",
                borderRadius: 6,
            },
        ],
    };

    return <Bar data={data} />;
}