import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
    const data = {
        labels: ["Cardiology", "Neurology", "Dermatology"],
        datasets: [
            {
                data: [40, 20, 30],
                backgroundColor: ["#6C4AF2", "#8D23F9", "#C77DFF"],
                borderWidth: 0,
            },
        ],
    };

    return <Doughnut data={data} />;
}