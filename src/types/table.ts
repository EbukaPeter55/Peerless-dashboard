import type { ReactNode } from "react";

export interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
}

export interface TableProps<T> {
    title?: string;
    columns: Column<T>[];
    data: T[];
}
