export interface BarChartProps {
    labels: string[];
    data: number[];
    colors?: string | string[];
}

export interface DoughnutChartProps {
    labels: string[];
    data: number[];
    colors?: string[];
    cutout?: string;
}
